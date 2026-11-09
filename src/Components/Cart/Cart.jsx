import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useCart } from '../../Context/CartContext';
import './Cart.css';

const formatPrice = (amount) =>
  new Intl.NumberFormat('el-GR', { style: 'currency', currency: 'EUR' }).format(amount);

const Cart = () => {
  const { cartItems, setCartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const changeQuantity = (id, selectedSize, amount) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.selectedSize === selectedSize
          ? { ...item, quantity: Math.max(1, Math.min(item.quantity + amount, 10)) }
          : item
      )
    );
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <section className="cart-empty">
        <h1>Your bag is waiting</h1>
        <p>Explore the collection and find a pair that feels like you.</p>
        <Link to="/#collection-container">Discover the collection</Link>
      </section>
    );
  }

  return (
    <section className="cart-container" aria-labelledby="cart-title">
      <p className="cart-step">YOUR BAG</p>
      <h1 className="cart-container-h2" id="cart-title">Shopping bag</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={`${item.id}-${item.selectedSize}`} className="cart-item">
            <Link className="product-image" to={`/product/${item.id}`} tabIndex={-1} aria-hidden="true">
              <img src={item.imageUrl1} alt="" />
            </Link>
            <div className="cart-product-details">
              <Link to={`/product/${item.id}`}>
                <h2>{item.name}</h2>
              </Link>
              <p>Size: <span>{item.selectedSize}</span></p>
              <p>Unit price: <span>{formatPrice(item.price)}</span></p>
              <button
                type="button"
                className="remove-item-btn"
                onClick={() => removeFromCart(item.id, item.selectedSize)}
              >
                Remove
              </button>
            </div>
            <div className="cart-line-total">
              <div className="cart-details-quantity" aria-label={`Quantity: ${item.quantity}`}>
                <button
                  type="button"
                  className="cart-cart-dec-btn"
                  aria-label={`Decrease ${item.name} quantity`}
                  onClick={() => changeQuantity(item.id, item.selectedSize, -1)}
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  className="cart-cart-inc-btn"
                  aria-label={`Increase ${item.name} quantity`}
                  onClick={() => changeQuantity(item.id, item.selectedSize, 1)}
                  disabled={item.quantity >= 10}
                >
                  +
                </button>
              </div>
              <strong>{formatPrice(item.price * item.quantity)}</strong>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-final-price">
        <div>
          <p>Subtotal</p>
          <span>{formatPrice(total)}</span>
        </div>
        <p className="cart-shipping-note">Shipping and applicable taxes are shown before payment.</p>
        <button type="button" className="proceed-to-payment-btn" onClick={() => navigate('/checkout')}>
          Continue to secure checkout
        </button>
        <Link className="cart-continue-shopping" to="/#collection-container">Continue shopping</Link>
      </div>
    </section>
  );
};

export default Cart;
