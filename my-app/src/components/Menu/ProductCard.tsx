import React, { useState } from 'react';
import { db } from '../../firebaseConfig.ts'; // Import Firestore configuration
import { collection, query, orderBy, limit, getDocs, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import './menu-style/ProductCard.css'; // Import the new CSS file

// Pass data props to FoodDrinkSection.tsx
interface ProductCardProps {
    sku_name: string;
    price: string;
    imageSrc: string;
    onAddToBag: (quantity: number) => void; // New prop for passing quantity
}

const ProductCard: React.FC<ProductCardProps> = ({ sku_name, price, imageSrc, onAddToBag }) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (change: number) => {
        const newQuantity = Math.max(1, quantity + change);
        setQuantity(newQuantity);
        // console.log(`ProductCard Count Qty: ${sku_name}, Quantity: ${newQuantity}`);
    };

    const handleAddToBag = async () => {
        console.log('Add to Bag button clicked'); // Log when the button is clicked
        console.log('Data to be added:', { sku_name, price, quantity, imageSrc }); // Log the data being sent

        // Create a custom document ID with prefix
        const docId = `cartItem-${sku_name}-${Date.now()}`; // Use SKU name and current timestamp for uniqueness

        // Save data to Firestore
        try {
            await setDoc(doc(db, 'Client123', docId), { // Use setDoc to specify document ID
                sku_name,
                price,
                quantity,
                imageSrc,
                createdAt: serverTimestamp(), // Add timestamp
            });
            console.log(`Added to bag: ${sku_name}, Quantity: ${quantity}`);
            
            // Call the new prop function to pass the quantity
            onAddToBag(quantity); // Pass the quantity to FoodDrinkSection
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    const handlePlaceOrder = async () => {
        console.log('Place Order button clicked'); // Log when the button is clicked

    };

    return (
        <div className="product-card" >
            <div className="product-card-content">
                <h2 className="product-title">{sku_name}</h2>
                <img src={imageSrc} className="product-image" />
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
                <span className="product-price">{price}</span>
            </div>
            {/* fixed card button */}
            <div className="action-buttons">
                <button onClick={handleAddToBag} className="add-to-bag-button">ADD TO BAG</button>
                <button onClick={handlePlaceOrder} className="place-order-button">PLACE THE ORDER</button>
            </div>
        </div>
    );
};

export default ProductCard;