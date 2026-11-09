import React, { useEffect, useState } from 'react';
import './ProductDetails.css';
import { useParams, useNavigate } from 'react-router';
import allProducts from "../Assets/shoe collection img/all_products.js";
import { useCart } from '../../Context/CartContext';

export const ProductDetails = () => {
    const { id } = useParams();
    const product = allProducts.find((p) => p.id === parseInt(id, 10));
    const { addToCart } = useCart();

    const [selectedImage, setSelectedImage] = useState(product?.imageUrl1 ?? "defaultImagePath.jpg");
    const [selectedSize, setSelectedSize] = React.useState(null);
    const [quantity, setQuantity] = useState(1);
    const [notification, setNotification] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setSelectedImage(product?.imageUrl1 ?? "");
        setSelectedSize(null);
        setQuantity(1);
        setNotification("");
        setError("");
    }, [id, product]);

    if (!product) {
        return <h2>Product not found</h2>;
    }

    const handleImageChange = (e) => {
        setSelectedImage(e.target.value);
    };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };

    const increaseQuantity = () => {
        setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 10)); // Max quantity is 10
    };

    const decreaseQuantity = () => {
        setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1)); // Min quantity is 1
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            setError("Please select a size before adding to your bag.");
            return;
        }

        setError("");
        const productWithDetails = {
            ...product, 
            selectedSize,
            quantity,
            price: Number(product.price.replace('€', '')),
        };
        addToCart(productWithDetails);
        setNotification("Το προϊόν προστέθηκε στο καλάθι.");

        setSelectedSize(null);
        setQuantity(1);
    };

    const Notification = ({ message, onClose }) => (
        <div className="notification" role="status" onAnimationEnd={onClose}>
            {message}
        </div>
    );

    const categories = Array.isArray(product.category) ? product.category : [product.category];
    const recommendations = allProducts.filter((item) => {
        if (item.id === product.id) {
            return false;
        }
        const itemCategories = Array.isArray(item.category) ? item.category : [item.category];
        return categories.some((category) => category !== "Γυναικεία" && category !== "Ανδρικά" && itemCategories.includes(category));
    });

    return (
        <div className="product-details-container">
            {notification && <Notification message={notification} onClose={() => setNotification("")} />}
            <div className="details-container">
                <div className="image-container">
                    <img className="shoe-image" src={selectedImage} alt={product.name} />
                    <div className="image-buttons">
                        <label
                            htmlFor="image1"
                            className={`image-button ${selectedImage === product.imageUrl1 ? 'active' : ''}`}
                        >
                            <input
                                type="radio"
                                id="image1"
                                name="shoe-image"
                                value={product.imageUrl1}
                                checked={selectedImage === product.imageUrl1}
                                onChange={handleImageChange}
                            />
                        </label>
                        <label
                            htmlFor="image2"
                            className={`image-button ${selectedImage === product.imageUrl2 ? 'active' : ''}`}
                        >
                            <input
                                type="radio"
                                id="image2"
                                name="shoe-image"
                                value={product.imageUrl2}
                                checked={selectedImage === product.imageUrl2}
                                onChange={handleImageChange}
                            />
                        </label>
                        <label
                            htmlFor="image3"
                            className={`image-button ${selectedImage === product.imageUrl3 ? 'active' : ''}`}
                        >
                            <input
                                type="radio"
                                id="image3"
                                name="shoe-image"
                                value={product.imageUrl3}
                                checked={selectedImage === product.imageUrl3}
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>
                </div>
                <div className="text-details">
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <div className="product-category">
                        {Array.isArray(product.category)
                            ? product.category.map((cat, index) => (
                                <span key={index} className="category-badge">{cat}</span>
                              ))
                            : <span className="category-badge">{product.category}</span>
                        }
                    </div>
                    <p>Τιμή: <span>{product.price}</span></p>

                    <div className="size-selector">
                        <span className="size-selector-label">Μεγέθη:</span>
                        <div className="size-buttons">
                            {[36, 37, 38, 39, 40, 41].map((size) => (
                                <button
                                    type="button"
                                    key={size}
                                    value={size}
                                    aria-pressed={selectedSize === size}
                                    className={`size-button ${selectedSize === size ? 'active' : ''}`}
                                    onClick={() => handleSizeChange(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="quantity-selector">
                        <span className="quantity-selector-label">Ποσότητα:</span>
                        <div className="quantity-buttons">
                            <button type="button" onClick={decreaseQuantity}>-</button>
                            <span>{quantity}</span>
                            <button type="button" onClick={increaseQuantity}>+</button>
                        </div>
                    </div>

                    {error && <p className="product-error" role="alert">{error}</p>}
                    <button type="button" className="add-to-cart" onClick={handleAddToCart}>
                        Προσθήκη στο καλάθι
                    </button>
                    <p className="product-trust-note">Ασφαλής πληρωμή με κάρτα μέσω Stripe Checkout.</p>
                </div>
            </div>
            <h3>Recommended Products</h3>
            <div className="recommendations">
                {recommendations.map((recommendedProduct) => (
                    <div
                        key={recommendedProduct.id}
                        onClick={() => navigate(`/product/${recommendedProduct.id}`)}
                    >
                        <img src={recommendedProduct.imageUrl1} alt={recommendedProduct.name} />
                        <p>{recommendedProduct.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDetails;
