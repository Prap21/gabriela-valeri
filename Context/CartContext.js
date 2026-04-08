import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  /**
   * Add item to cart
   */
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.selectedSize === product.selectedSize
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += product.quantity;
        return updatedItems;
      }

      return [...prevItems, product];
    });
  };

  /**
   * Save cart to backend
   */
  const saveCart = async (userId, cartItems) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/saveCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, cartItems }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Failed to save cart:', error.message);
      } else {
        console.log('Cart saved successfully');
      }
    } catch (error) {
      console.error('Error in saving cart:', error);
    }
  };

  /**
   * Fetch cart from backend
   */
  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token || !user) {
      console.error('No token or user is not logged in');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/get-cart', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cart || []); // Ensure this updates cartItems
      } else {
        const errorData = await response.json();
        console.error('Error fetching cart', errorData);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };
  

  /**
   * Handle user logout
   */
  const handleLogout = () => {
    if (cartItems.length > 0 && user) {
      saveCart(user.id, cartItems).then(() => {
        logout();
        setCartItems([]);
        localStorage.removeItem('token');
      }); 
    } else {
      logout();
      setCartItems([]);
      localStorage.removeItem('token');
    }
  };

  /**
   * Fetch cart when user logs in
   */
  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  /**
   * Save cart whenever cartItems change
   */
  useEffect(() => {
    if (user && cartItems.length > 0) {
      saveCart(user.id, cartItems);
    }
  }, [cartItems, user]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, handleLogout }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
