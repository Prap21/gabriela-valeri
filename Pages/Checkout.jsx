import React, { useState } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with the publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log('Stripe has not loaded yet.');
      return;
    }

    setIsProcessing(true);

    // Call your backend to create a PaymentIntent
    const { clientSecret } = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 5000 }), // Example: $50.00 (5000 cents)
    }).then((res) => res.json());

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      console.log('Payment failed:', result.error.message);
    } else if (result.paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded!');
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={isProcessing || !stripe}>
        {isProcessing ? 'Processing…' : 'Pay'}
      </button>
    </form>
  );
};

const Checkout = () => {
  return (
    <div>
      <h1>Checkout Page</h1>
      {/* Wrap the CheckoutForm in the Elements provider */}
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Checkout;
