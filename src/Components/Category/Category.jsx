// src/Components/Category/Category.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import allProducts from '../Assets/shoe collection img/all_products.js'; // Import your products
import './Category.css';

export const Category = () => {
  const { category } = useParams(); // Extract category from URL
  const [filteredShoes, setFilteredShoes] = useState([]);

  useEffect(() => {
    // Filter shoes when category changes
    const filterShoes = () => {
      const filtered = allProducts.filter(product => {
        return Array.isArray(product.category)
          ? product.category.some(cat => cat.toLowerCase().includes(category.toLowerCase()))
          : product.category.toLowerCase().includes(category.toLowerCase());
      });
      setFilteredShoes(filtered);
    };

    filterShoes();
  }, [category]); // Re-run the filter when the category changes

  return (
    <div className="category-div">
      {/* Categories list for navigation */}
      <div className="shoe-categories">
        <ul>
          <li className="dropdown">
            <Link to="/category/Γυναικεία" className='category-header'>Γυναικεία</Link>
            <ul className="dropdown-content">
              <li><Link to="/category/Γόβες">Γόβες</Link></li>
              <li><Link to="/category/Μποτάκια">Μποτάκια</Link></li>
              <li><Link to="/category/Μπότες">Μπότες</Link></li>
              <li><Link to="/category/Πέδιλα">Πέδιλα</Link></li>
              <li><Link to="/category/Loafers">Loafers</Link></li>
              <li><Link to="/category/Flat">Flat</Link></li>
              <li><Link to="/category/Παντόφλες">Παντόφλες</Link></li>
              <li><Link to="/category/Μπαλαρίνες">Μπαλαρίνες</Link></li>
              <li><Link to="/category/Mules">Mules</Link></li>
              <li><Link to="/category/Sneakers">Sneakers</Link></li>
            </ul>
          </li>
          <ul>
            <li><Link to="/category/Νυφικά" className='category-header'>Νυφικά</Link></li>
          </ul>
          <li className="dropdown">
            <Link to="/category/Ανδρικά" className='category-header'>Ανδρικά</Link>
            <ul className="dropdown-content">
              <li><Link to="/category/Ανδρικά-Sneakers">Sneakers</Link></li>
              <li><Link to="/category/Ανδρικά-Σκαρπίνια">Σκαρπίνια</Link></li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Category products */}
      <div className="category-container" id="category-container">
        <h2 className='category-h2'>{category}</h2>
        {filteredShoes.length > 0 ? (
          <div className="product-list">
            {filteredShoes.map(product => (
              <div key={product.id} className="product-card">
                {/* Wrap the product card in a Link */}
                <Link to={`/product/${product.id}`} className="product-link">
                  <img src={product.imageUrl1} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>{product.price}</p>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Category;
