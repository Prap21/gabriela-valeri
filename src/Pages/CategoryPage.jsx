// src/pages/CategoryPage.jsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import Category from '../Components/Category/Category';

const CategoryPage = () => {
  const { category } = useParams(); // Get category from the URL parameter

  useEffect(() => {
    // Scroll to collection container once the page is loaded
    const collectionContainer = document.getElementById('collection-container');
    if (collectionContainer) {
      collectionContainer.scrollIntoView({ behavior: 'smooth' });
    }
  }, [category]); // Only run on category change or page load

  return (
    <div>
      {/* Category component will handle displaying products based on the URL category */}
      <Category />
    </div>
  );
};

export default CategoryPage;
