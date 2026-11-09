import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';

import './App.css';
import StoreLayout from './Layouts/StoreLayout';
import Home from './Pages/Home';
import CategoryPage from './Pages/CategoryPage';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import CartPage from './Pages/CartPage';
import Checkout, { CheckoutCancelled, CheckoutSuccess } from './Pages/Checkout';
import NotFoundPage from './Pages/NotFoundPage';

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(location.hash.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route element={<StoreLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/cancelled" element={<CheckoutCancelled />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
