import React, { useState } from 'react';
import { db } from '../../firebaseConfig.ts'; // Import Firestore configuration
import { collection, query, orderBy, limit, getDocs, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import './menu-style/ProductCard.css'; // Import the new CSS file

// Pass data props to FoodDrinkSection.tsx
interface ProductCardProps {
    sku_name: string;
    price: string;
    imageSrc: string;
    sku_id: string; // New entry for sku_id
    onAddToBag: (quantity: number, sku_id: string, isAdded: boolean) => void; // Updated to include isAdded
    onItemCountChange?: (itemCount: number) => void;
    onSubtotalChange?: (subtotal: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ sku_name, price, imageSrc, sku_id, onAddToBag, onItemCountChange, onSubtotalChange }) => {
    // console.log('SKU ID:', sku_id); // Log the SKU ID to check if it's received correctly
    const [quantity, setQuantity] = useState(1);
    const [isImageOpen, setIsImageOpen] = useState(false); // State to manage full image visibility
    const [itemCount, setItemCount] = useState(0);

    const handleQuantityChange = (change: number) => {
        const newQuantity = Math.max(1, quantity + change);
        setQuantity(newQuantity);
        // console.log(`ProductCard Count Qty: ${sku_name}, Quantity: ${newQuantity}`);
    };

    const handleAddToBag = async () => {
        // console.log('Add to Bag button clicked'); // Log when the button is clicked
        // console.log('Data to be added:', { sku_id, sku_name, price, quantity, imageSrc }); // Log the data being sent
        onAddToBag(quantity, sku_id, true);

        // Calculate the total item price
        const totalItemPrice = parseFloat(price) * quantity;

        // Cache the item in local storage with totalItemPrice
        const cartItem = { sku_id, sku_name, price, quantity, imageSrc, totalItemPrice };
        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

        // Check if the item already exists in the cart
        const itemIndex = existingCart.findIndex((item: any) => item.sku_id === sku_id);
        if (itemIndex > -1) {
            // Update the quantity and totalItemPrice if the item exists
            existingCart[itemIndex].quantity += quantity;
            existingCart[itemIndex].totalItemPrice += totalItemPrice;
        } else {
            // Add the new item if it doesn't exist
            existingCart.push(cartItem);
        }

        // Calculate the new item count
        const newItemCount = existingCart.reduce((total: number, item: any) => total + item.quantity, 0);
        localStorage.setItem('totalItems', JSON.stringify(newItemCount));
        console.log('Total items saved to local storage:', newItemCount);
        setItemCount(newItemCount);
        onItemCountChange?.(newItemCount);

        // Calculate the new subtotal
        const newSubtotal = existingCart.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
        localStorage.setItem('subtotal', JSON.stringify(newSubtotal));
        console.log('Subtotal saved to local storage:', newSubtotal);
        onSubtotalChange?.(newSubtotal);

        // Dispatch custom event to notify of subtotal update
        window.dispatchEvent(new Event('subtotalUpdated'));

        // Save the updated cart to local storage
        localStorage.setItem('cart', JSON.stringify(existingCart));
        console.log('Cart saved to local storage:', existingCart);

        // Dispatch custom event to notify of cart update
        window.dispatchEvent(new Event('cartUpdated'));

        // Print the cached data
        console.log('Cached cart data:', existingCart);
        console.log('Total items in cart:', newItemCount);

        // Print the total item price
        // console.log('Total item price:', totalItemPrice);
    };

    const handlePlaceOrder = async () => {
        console.log('Place Order button clicked'); // Log when the button is clicked

    };

    const toggleImageModal = () => {
        setIsImageOpen(!isImageOpen); // Toggle the image modal visibility
    };

    return (
        <>
            <div className="product-card">
                <div className="product-card-content">
                    {/* <h2 className="product-title">{sku_id}</h2> */}
                    <h2 className="product-title">{sku_name}</h2>
                    <img src={imageSrc} className="product-image" onClick={toggleImageModal} />
                    <div className="product-size">
                        <span className="size-label">Size:</span>
                    </div>
                    <div className="product-sugar">
                        <span className="sugar-label">SUGAR:</span>
                        <div className="sugar-options">
                            {['NORMAL', 'LESS', 'HALF', 'NO'].map((option) => (
                                <button key={option} className={`sugar-button ${option === 'NORMAL' ? 'active' : ''}`}>
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="product-sugar">
                        <span className="sugar-label">SUGAR:</span>
                        <div className="sugar-options">
                            {['NORMAL', 'LESS', 'HALF', 'NO'].map((option) => (
                                <button key={option} className={`sugar-button ${option === 'NORMAL' ? 'active' : ''}`}>
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="product-sugar">
                        <span className="sugar-label">SUGAR:</span>
                        <div className="sugar-options">
                            {['NORMAL', 'LESS', 'HALF', 'NO'].map((option) => (
                                <button key={option} className={`sugar-button ${option === 'NORMAL' ? 'active' : ''}`}>
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="product-sugar">
                        <span className="sugar-label">SUGAR:</span>
                        <div className="sugar-options">
                            {['NORMAL', 'LESS', 'HALF', 'NO'].map((option) => (
                                <button key={option} className={`sugar-button ${option === 'NORMAL' ? 'active' : ''}`}>
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="product-sugar">
                        <span className="sugar-label">SUGAR:</span>
                        <div className="sugar-options">
                            {['NORMAL', 'LESS', 'HALF', 'NO'].map((option) => (
                                <button key={option} className={`sugar-button ${option === 'NORMAL' ? 'active' : ''}`}>
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                {/* quantity button */}
                <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(-1)} className="quantity-button">−</button>
                    <span className="quantity-display">{quantity}</span>
                    <button onClick={() => handleQuantityChange(1)} className="quantity-button">+</button>
                    <span className="product-price">RM {price}</span>
                </div>
                {/* fixed card button */}
                <div className="action-buttons">
                    <button onClick={handleAddToBag} className="add-to-bag-button">ADD TO BAG</button>
                    <button onClick={handlePlaceOrder} className="place-order-button">PLACE THE ORDER</button>
                </div>
            </div>
            {isImageOpen && (
                <div className="image-modal" onClick={toggleImageModal}>
                    <img src={imageSrc} className="full-image" />
                    <button className="close-image-button" onClick={toggleImageModal}>X</button>
                </div>
            )}
        </>
    );
};

export default ProductCard;