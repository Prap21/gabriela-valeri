import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './Context/CartContext';
import { AuthProvider } from './Context/AuthContext';

import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import Home from './Pages/Home';
import CategoryPage from './Pages/CategoryPage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import CartPage from './Pages/CartPage';
import Checkout from './Pages/Checkout';

// Scroll to footer section
function ScrollToFooter() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#communication') {
      const element = document.getElementById('communication');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return null;
}

// Scroll to collection section
function ScrollToCollection() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#collection-container') {
      const element = document.getElementById('collection-container');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return null;
}

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;
