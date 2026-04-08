import React from 'react';
import './Collection.css';
import allProducts from "../Assets/shoe collection img/all_products.js";
import { Link } from 'react-router-dom';

export const Collection = () => {
    return (
        <div className="collection-container" id="collection-container">
            <h2>Our Collection</h2>
            <div className="product-list">
                {allProducts.map((product) => (
                    // Key should be on the Link component, not the div inside it
                    <Link to={`/product/${product.id}`} key={product.id}>
                        <div className="product-card">
                            <img src={product.imageUrl1} alt={product.name} />
                            <div className="details">
                                <h3>{product.name}</h3>
                                <p>Τιμή: <span>{product.price}</span></p>
                            </div>
                            <div className="product-category">
                                {Array.isArray(product.category)
                                    ? product.category.map((cat, index) => (
                                        <span key={index} className="category-badge">
                                            {cat}
                                        </span>
                                      ))
                                    : <span className="category-badge">{product.category}</span>
                                }
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Collection;
