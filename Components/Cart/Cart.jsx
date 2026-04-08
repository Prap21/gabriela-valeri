import React, { useEffect, useState } from 'react';
import { useCart } from '../../Context/CartContext';
import { useAuth } from '../../Context/AuthContext'; // Access AuthContext
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../Pages/Checkout'; // Import CheckoutForm

// Stripe setup with your publishable key
const stripePromise = loadStripe('your_publishable_key_here'); // Replace with your publishable key

const Cart = () => {
  const { cartItems, setCartItems } = useCart();
  const { user } = useAuth(); // Access user from AuthContext
  const navigate = useNavigate();
  const [isPaymentOpen, setPaymentOpen] = useState(false);

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to login page if not logged in
    }
  }, [user, navigate]);

  // If cart is empty, show an empty message
  if (cartItems.length === 0) {
    return <h2>Your cart is empty</h2>;
  }

  // Increase item quantity
  const increaseQuantity = (id, selectedSize) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === id && item.selectedSize === selectedSize) {
          const newQuantity = Math.min(item.quantity + 1, 10); // Max quantity is 10
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      return updatedItems;
    });
  };

  // Decrease item quantity
  const decreaseQuantity = (id, selectedSize) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === id && item.selectedSize === selectedSize) {
          const newQuantity = Math.max(item.quantity - 1, 1); // Min quantity is 1
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      return updatedItems;
    });
  };

  // Calculate total price of cart items
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2 className="cart-container-h2">Your Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index} className="cart-item">
            <div className="product-image">
              <img src={item.imageUrl1} alt={item.name} />
            </div>
            <div className="cart-details-quantity">
              <button
                className="cart-cart-dec-btn"
                onClick={() => decreaseQuantity(item.id, item.selectedSize)}
              >
                -
              </button>
              <p>{item.quantity}</p>
              <button
                className="cart-cart-inc-btn"
                onClick={() => increaseQuantity(item.id, item.selectedSize)}
              >
                +
              </button>
            </div>
            <div className="cart-product-details">
              <h3>{item.name}</h3>
              <p>
                Size: <span>{item.selectedSize}</span>
              </p>
              <p>
                Product Price: <span>{item.price}€</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-final-price">
        <p>
          Total Price: <span>{total.toFixed(2)}€</span>
        </p>
        <button onClick={() => setPaymentOpen(true)} className="proceed-to-payment-btn">
          Πληρωμή
        </button>
      </div>

      {isPaymentOpen && (
        <Elements stripe={stripePromise}>
          <CheckoutForm total={total} onClose={() => setPaymentOpen(false)} />
        </Elements>
      )}
    </div>
  );
};

export default Cart;
