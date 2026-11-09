# Gabriela Valeri storefront

A React storefront with a small Express API and Stripe-hosted checkout.

## Run locally

Use Node.js 20 or later.

1. Copy `.env.example` to `.env`.
2. Set `STRIPE_SECRET_KEY` to a Stripe **test-mode** secret key.
3. Set `SHIPPING_AMOUNT_CENTS` to the shop's intended delivery charge (in euro cents). Keep `0` only if delivery is genuinely free.
4. Run `npm install`, then `npm start`.
5. Open the React development URL printed by Create React App (normally `http://localhost:3000`).

`npm start` runs the API on port 4242 and the React development server. Test payments use Stripe's test card `4242 4242 4242 4242`; use any future expiry date and any CVC. Never use real card details with test keys.

For local webhook testing, run Stripe CLI in a separate terminal and forward events to `http://localhost:4242/api/stripe/webhook`; set the printed signing secret as `STRIPE_WEBHOOK_SECRET`.

## Production setup

1. Create and verify the shop's Stripe account. Configure customer receipts, payment methods, tax registrations, and shipping policy in Stripe.
2. Set production secrets through the hosting provider's environment settings; do not commit `.env` or use a `sk_test_` key for live orders.
3. Set `APP_URL` to the canonical HTTPS storefront URL, `STRIPE_SECRET_KEY` to the live secret key, `SHIPPING_AMOUNT_CENTS` to the real delivery amount, and `ALLOWED_SHIPPING_COUNTRIES` to countries the shop actually serves.
4. Set `STRIPE_AUTOMATIC_TAX=true` only after Stripe Tax is enabled and the business's registrations and tax settings are correct.
5. Register `https://your-domain.example/api/stripe/webhook` in Stripe and configure its signing secret. The webhook verifies events; completed payments and customer/order details are available in Stripe Dashboard.
6. Run `npm run serve` to build the React app and serve it with the API from one Express process. Configure the host to keep that process running and provide persistent logs.

The API recalculates product prices from `src/data/checkout-catalog.json`; it never accepts prices supplied by the browser. The same catalogue supplies the displayed storefront prices.

## Store capabilities and launch checklist

- Product browsing, category navigation, size selection, persistent guest cart, and checkout do not require a browser-only account.
- Card details are collected by Stripe Checkout and are not handled by this app.
- The previous local-storage login/register flow was removed from the live routes because it was only a demo and stored passwords in the browser. Customer accounts are not currently provided.
- A Stripe payment is confirmed only after the success page verifies the Checkout Session with the server. Cancelling payment leaves the cart intact.
- Confirm business identity, return/refund policy, shipping and delivery terms, privacy notice, tax treatment, and customer-support details before launch. The site does not invent these legal or operational details.
- Test the full purchase and refund process in Stripe test mode, configure order receipts, and decide how staff will fulfil and track orders in Stripe Dashboard. Inventory is not tracked by this starter catalogue.

## Useful commands

- `npm start` — run the React and API development servers.
- `npm run build` — create an optimized frontend build.
- `npm run serve` — build and serve the production app/API.
- `npm test -- --watchAll=false` — run the React tests.
