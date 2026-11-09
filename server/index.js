require('dotenv').config();

const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const Stripe = require('stripe');
const path = require('path');
const checkoutCatalog = require('../src/data/checkout-catalog.json');

const app = express();
const port = Number(process.env.API_PORT || 4242);
const allowedCountries = (process.env.ALLOWED_SHIPPING_COUNTRIES || 'GR')
  .split(',')
  .map((country) => country.trim().toUpperCase())
  .filter(Boolean);
const productsById = new Map(checkoutCatalog.map((product) => [product.id, product]));
const checkoutLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

app.disable('x-powered-by');
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://cdnjs.cloudflare.com'],
        fontSrc: ["'self'", 'data:', 'https://cdnjs.cloudflare.com'],
        imgSrc: ["'self'", 'data:', 'blob:'],
      },
    },
  })
);

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    const error = new Error('Online payments are not configured on the server.');
    error.status = 503;
    throw error;
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
};

const getCheckoutConfig = () => {
  const appUrl = process.env.APP_URL || 'http://localhost:3000';
  let parsedUrl;
  try {
    parsedUrl = new URL(appUrl);
  } catch {
    const error = new Error('The checkout return URL is not configured correctly.');
    error.status = 503;
    throw error;
  }

  if (
    !['http:', 'https:'].includes(parsedUrl.protocol) ||
    (process.env.NODE_ENV === 'production' && parsedUrl.protocol !== 'https:')
  ) {
    const error = new Error('The checkout return URL must use HTTPS in production.');
    error.status = 503;
    throw error;
  }

  if (
    !allowedCountries.length ||
    allowedCountries.some((country) => !/^[A-Z]{2}$/.test(country))
  ) {
    const error = new Error('Allowed shipping countries are not configured correctly.');
    error.status = 503;
    throw error;
  }

  const rawShippingAmount = process.env.SHIPPING_AMOUNT_CENTS;
  if (!/^\d+$/.test(rawShippingAmount || '')) {
    const error = new Error('Shipping cost is not configured. Please contact the shop.');
    error.status = 503;
    throw error;
  }

  const shippingAmount = Number(rawShippingAmount);
  if (!Number.isSafeInteger(shippingAmount) || shippingAmount < 0) {
    const error = new Error('Shipping cost is not configured correctly.');
    error.status = 503;
    throw error;
  }

  return {
    appUrl: parsedUrl.origin,
    shippingAmount,
    shippingName: (process.env.SHIPPING_DISPLAY_NAME || 'Shipping').slice(0, 100),
  };
};

const parseCartItems = (body) => {
  if (!Array.isArray(body?.items) || body.items.length < 1 || body.items.length > 50) {
    return null;
  }

  const items = new Map();
  for (const candidate of body.items) {
    const productId = Number(candidate?.productId);
    const size = Number(candidate?.size);
    const quantity = Number(candidate?.quantity);
    if (
      !Number.isSafeInteger(productId) ||
      !productsById.has(productId) ||
      !Number.isSafeInteger(size) ||
      size < 36 ||
      size > 41 ||
      !Number.isSafeInteger(quantity) ||
      quantity < 1 ||
      quantity > 10
    ) {
      return null;
    }

    const key = `${productId}:${size}`;
    const currentQuantity = items.get(key)?.quantity || 0;
    if (currentQuantity + quantity > 10) {
      return null;
    }

    items.set(key, { productId, size, quantity: currentQuantity + quantity });
  }

  return [...items.values()];
};

app.post(
  '/api/stripe/webhook',
  express.raw({ type: 'application/json', limit: '1mb' }),
  (request, response) => {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return response.status(503).json({ error: 'Payment notifications are not configured.' });
    }

    let event;
    try {
      event = getStripe().webhooks.constructEvent(
        request.body,
        request.headers['stripe-signature'],
        webhookSecret
      );
    } catch (error) {
      console.error('Rejected Stripe webhook signature.', error.message);
      return response.status(400).json({ error: 'Invalid payment notification signature.' });
    }

    if (
      (event.type === 'checkout.session.completed' ||
        event.type === 'checkout.session.async_payment_succeeded') &&
      event.data.object.payment_status === 'paid'
    ) {
      console.info(`Stripe payment completed: ${event.data.object.id}`);
    }

    return response.json({ received: true });
  }
);

app.use(express.json({ limit: '16kb' }));

app.get('/api/health', (request, response) => {
  const shippingAmount = Number(process.env.SHIPPING_AMOUNT_CENTS);
  response.json({
    status: 'ok',
    paymentsConfigured: Boolean(process.env.STRIPE_SECRET_KEY),
    shippingConfigured:
      /^\d+$/.test(process.env.SHIPPING_AMOUNT_CENTS || '') &&
      Number.isSafeInteger(shippingAmount) &&
      shippingAmount >= 0 &&
      allowedCountries.length > 0 &&
      allowedCountries.every((country) => /^[A-Z]{2}$/.test(country)),
  });
});

app.post('/api/checkout/sessions', checkoutLimiter, async (request, response) => {
  const items = parseCartItems(request.body);
  if (!items) {
    return response.status(400).json({ error: 'Your bag contains an invalid item. Please review it and try again.' });
  }

  try {
    const stripe = getStripe();
    const config = getCheckoutConfig();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: items.map((item) => {
        const product = productsById.get(item.productId);
        return {
          quantity: item.quantity,
          price_data: {
            currency: 'eur',
            unit_amount: product.unitAmount,
            product_data: {
              name: product.name,
              description: `EU size ${item.size}`,
            },
          },
        };
      }),
      shipping_address_collection: { allowed_countries: allowedCountries },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: config.shippingAmount, currency: 'eur' },
            display_name: config.shippingName,
          },
        },
      ],
      phone_number_collection: { enabled: true },
      billing_address_collection: 'required',
      automatic_tax: { enabled: process.env.STRIPE_AUTOMATIC_TAX === 'true' },
      success_url: `${config.appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.appUrl}/checkout/cancelled`,
    });

    return response.status(201).json({ url: session.url });
  } catch (error) {
    if (error.status === 503) {
      return response.status(503).json({ error: error.message });
    }
    console.error('Unable to create Stripe Checkout session.', error.message);
    return response.status(502).json({
      error: 'Secure checkout is temporarily unavailable. Please try again in a moment.',
    });
  }
});

app.get('/api/checkout/sessions/:sessionId', checkoutLimiter, async (request, response) => {
  if (!/^cs_(test|live)_[A-Za-z0-9]+$/.test(request.params.sessionId)) {
    return response.status(400).json({ error: 'Invalid payment reference.' });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(request.params.sessionId);

    if (session.mode !== 'payment') {
      return response.status(404).json({ error: 'Payment reference not found.' });
    }

    const lineItems = session.payment_status === 'paid'
      ? await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 })
      : { data: [] };

    return response.json({
      id: session.id.slice(-12).toUpperCase(),
      paid: session.payment_status === 'paid',
      amountTotal: session.amount_total,
      currency: session.currency,
      items: lineItems.data.map((item) => ({
        name: item.description || 'Store item',
        quantity: item.quantity,
        amountTotal: item.amount_total,
      })),
    });
  } catch (error) {
    if (error.status === 503) {
      return response.status(503).json({ error: error.message });
    }
    console.error('Unable to verify Stripe Checkout session.', error.message);
    return response.status(404).json({ error: 'Payment reference could not be verified.' });
  }
});

if (process.argv.includes('--serve')) {
  const buildPath = path.join(__dirname, '..', 'build');
  app.use(express.static(buildPath, { fallthrough: true }));
  app.get(/.*/, (request, response, next) => {
    if (request.path.startsWith('/api/')) {
      return next();
    }
    return response.sendFile(path.join(buildPath, 'index.html'));
  });
}

app.use((error, request, response, next) => {
  if (response.headersSent) {
    return next(error);
  }
  console.error('Unhandled API request error.', error.message);
  return response.status(error.status || 500).json({
    error: error.status ? error.message : 'Something went wrong. Please try again.',
  });
});

app.listen(port, () => {
  console.info(`Gabriela Valeri API listening on port ${port}.`);
});
