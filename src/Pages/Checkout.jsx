import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { useCart } from '../Context/CartContext';
import './Checkout.css';

const formatPrice = (amount) =>
  new Intl.NumberFormat('el-GR', { style: 'currency', currency: 'EUR' }).format(amount);

const Checkout = () => {
  const { cartItems } = useCart();
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState('');
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const startCheckout = async () => {
    setIsStarting(true);
    setError('');

    try {
      const response = await fetch('/api/checkout/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems.map(({ id, selectedSize, quantity }) => ({
            productId: id,
            size: selectedSize,
            quantity,
          })),
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Unable to start secure checkout.');
      }

      if (!result.url) {
        throw new Error('The payment provider did not return a checkout link.');
      }

      window.location.assign(result.url);
    } catch (checkoutError) {
      setError(checkoutError.message || 'Unable to start secure checkout. Please try again.');
      setIsStarting(false);
    }
  };

  if (!cartItems.length) {
    return (
      <section className="checkout-empty">
        <h1>Your bag is empty</h1>
        <p>Add an item before continuing to checkout.</p>
        <Link to="/#collection-container">Return to the collection</Link>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-card">
        <p className="checkout-eyebrow">SECURE CHECKOUT</p>
        <h1>Review your order</h1>
        <p className="checkout-intro">
          You’ll enter your email, delivery address, and payment details on Stripe’s secure checkout page.
        </p>
        <ul className="checkout-items">
          {cartItems.map((item) => (
            <li key={`${item.id}-${item.selectedSize}`}>
              <span>{item.name} · EU {item.selectedSize} × {item.quantity}</span>
              <strong>{formatPrice(item.price * item.quantity)}</strong>
            </li>
          ))}
        </ul>
        <div className="checkout-total">
          <span>Subtotal</span>
          <strong>{formatPrice(total)}</strong>
        </div>
        <p className="checkout-shipping-note">
          Shipping is shown before payment. Applicable tax calculation must be enabled in the shop’s Stripe settings.
        </p>
        {error && <p className="checkout-error" role="alert">{error}</p>}
        <button
          type="button"
          className="checkout-submit"
          onClick={startCheckout}
          disabled={isStarting}
        >
          {isStarting ? 'Connecting to secure checkout…' : 'Continue to payment'}
        </button>
        <Link className="checkout-back" to="/cart">Back to your bag</Link>
        <p className="checkout-security">Card details are entered on Stripe and never stored by this website.</p>
      </div>
    </section>
  );
};

export const CheckoutSuccess = () => {
  const { clearCart } = useCart();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [state, setState] = useState({ loading: true, order: null, error: '' });

  useEffect(() => {
    if (!sessionId) {
      setState({ loading: false, order: null, error: 'The payment reference is missing.' });
      return undefined;
    }

    const controller = new AbortController();
    const verifyPayment = async () => {
      try {
        const response = await fetch(
          `/api/checkout/sessions/${encodeURIComponent(sessionId)}`,
          { signal: controller.signal }
        );
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Unable to verify this payment.');
        }

        if (!result.paid) {
          setState({ loading: false, order: null, error: 'This payment has not been completed.' });
          return;
        }

        clearCart();
        setState({ loading: false, order: result, error: '' });
      } catch (error) {
        if (error.name !== 'AbortError') {
          setState({
            loading: false,
            order: null,
            error: error.message || 'Unable to verify this payment. Please contact the shop before retrying.',
          });
        }
      }
    };

    verifyPayment();
    return () => controller.abort();
  }, [sessionId, clearCart]);

  return (
    <section className="checkout-result">
      {state.loading ? (
        <p role="status">Verifying your payment…</p>
      ) : state.order ? (
        <>
          <p className="checkout-eyebrow">PAYMENT CONFIRMED</p>
          <h1>Thank you for your order.</h1>
          <p>Order reference: <strong>{state.order.id}</strong></p>
          <p>Total paid: <strong>{formatPrice(state.order.amountTotal / 100)}</strong></p>
          <ul className="checkout-items">
            {state.order.items.map((item, index) => (
              <li key={`${item.name}-${index}`}>
                <span>{item.name} × {item.quantity}</span>
                <strong>{formatPrice(item.amountTotal / 100)}</strong>
              </li>
            ))}
          </ul>
          <Link to="/">Continue shopping</Link>
        </>
      ) : (
        <>
          <p className="checkout-eyebrow">PAYMENT STATUS</p>
          <h1>We couldn’t confirm the payment.</h1>
          <p role="alert">{state.error}</p>
          <p>Your bag has been kept. If you see a charge, please contact the shop before trying again.</p>
          <Link to="/cart">Return to your bag</Link>
        </>
      )}
    </section>
  );
};

export const CheckoutCancelled = () => (
  <section className="checkout-result">
    <p className="checkout-eyebrow">CHECKOUT CANCELLED</p>
    <h1>Your bag is still here.</h1>
    <p>No order was confirmed. You can review your items or return to the collection.</p>
    <Link to="/cart">Return to your bag</Link>
  </section>
);

export default Checkout;
