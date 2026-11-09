import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import checkoutCatalog from '../data/checkout-catalog.json';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'cart:guest';
const productsById = new Map(checkoutCatalog.map((product) => [product.id, product]));

const readCart = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
    if (!Array.isArray(stored)) {
      return [];
    }

    return stored
      .filter((item) =>
        Number.isInteger(item?.id) &&
        productsById.has(item.id) &&
        Number.isInteger(item?.selectedSize) &&
        item.selectedSize >= 36 &&
        item.selectedSize <= 41 &&
        Number.isInteger(item?.quantity) &&
        item.quantity >= 1 &&
        item.quantity <= 10
      )
      .map((item) => {
        const product = productsById.get(item.id);
        return {
          ...item,
          name: product.name,
          price: product.unitAmount / 100,
        };
      });
  } catch (error) {
    console.error('Unable to restore the saved cart.', error);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(readCart);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Unable to save the cart in this browser.', error);
    }
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) => item.id === product.id && item.selectedSize === product.selectedSize
      );

      if (existingItem) {
        return previousItems.map((item) =>
          item.id === product.id && item.selectedSize === product.selectedSize
            ? { ...item, quantity: Math.min(item.quantity + product.quantity, 10) }
            : item
        );
      }

      return [...previousItems, product];
    });
  };

  const removeFromCart = (id, selectedSize) => {
    setCartItems((previousItems) =>
      previousItems.filter((item) => !(item.id === id && item.selectedSize === selectedSize))
    );
  };

  const clearCart = useCallback(() => setCartItems([]), []);
  const totalItems = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addToCart, removeFromCart, clearCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider.');
  }
  return context;
};
