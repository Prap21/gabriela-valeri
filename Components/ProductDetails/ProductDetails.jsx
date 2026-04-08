import React, { useState } from 'react';
import './ProductDetails.css';
import { useParams } from 'react-router-dom';
import allProducts from "../Assets/shoe collection img/all_products.js";
import { useCart } from '../../Context/CartContext'; // Correct path
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext'; // Import useAuth hook

export const ProductDetails = () => {
    const { id } = useParams();
    const product = allProducts.find((p) => p.id === parseInt(id, 10));
    const { addToCart } = useCart(); // Use the hook here, unconditionally
    const { user } = useAuth(); // Get user state from AuthContext

    const [selectedImage, setSelectedImage] = useState(product?.imageUrl1 ?? "defaultImagePath.jpg");
    const [selectedSize, setSelectedSize] = React.useState(null);
    const [quantity, setQuantity] = useState(1);
    const [notification, setNotification] = useState("");
    const navigate = useNavigate();

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
        if (!user) {
            alert("You need to log in to add items to the cart.");
            navigate('/login'); // Redirect to login page
            return;
        }

        if (!selectedSize) {
            alert("Please select a size before adding to cart.");
            return;
        }

        const productWithDetails = {
            ...product, 
            selectedSize, 
            quantity: parseInt(quantity, 10),
            price: parseFloat(product.price.replace('€', '')), // Convert price to number for calculations
        };
        addToCart(productWithDetails);

        // Reset the selected size and quantity
        setSelectedSize(null);
        setQuantity(1);

        setTimeout(() => setNotification(""), 4000);
    };

    const Notification = ({ message, onClose }) => (
        <div className="notification" onAnimationEnd={onClose}>
            {message}
        </div>
    );

    {notification && <Notification message={notification} onClose={() => setNotification("")} />}

    return (
        <div className="product-details-container">
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

                    {/* Shoe sizes selection */}
                    <div className="size-selector">
                        <label>Μεγέθη:</label>
                        <div className="size-buttons">
                            {[36, 37, 38, 39, 40, 41].map((size) => (
                                <button
                                    key={size}
                                    value={size}
                                    className={`size-button ${selectedSize === size ? 'active' : ''}`}
                                    onClick={() => handleSizeChange(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity selector */}
                    <div className="quantity-selector">
                        <label>Ποσότητα:</label>
                        <div className="quantity-buttons">
                            <button type="button" onClick={decreaseQuantity}>-</button>
                            <span>{quantity}</span>
                            <button type="button" onClick={increaseQuantity}>+</button>
                        </div>
                    </div>

                    {/* Add to cart button */}
                    <button className="add-to-cart" onClick={handleAddToCart}>
                        Προσθήκη στο καλάθι
                    </button>
                </div>
            </div>
            <h3>Recommended Products</h3>
            <div className="recommendations">
                {allProducts
                    .filter((p) => p.category === product.category && p.id !== product.id)
                    .map((recommendedProduct) => (
                        <div key={recommendedProduct.id}>
                            <img src={recommendedProduct.imageUrl1} alt={recommendedProduct.name} />
                            <p>{recommendedProduct.name}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ProductDetails;
