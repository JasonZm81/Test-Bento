import React, { useState } from 'react';
import ProductCard from './ProductCard.tsx';
import { db } from '../../firebaseConfig.ts';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import './menu-style/FoodAndDrinks.css';

// Pass data props 
interface FoodDrinkSectionProps {
    sku_id: string; // Add sku_id to the props
    imageSrc: string;
    description: string;
    sku_name?: string; // Optional if not always provided
    price?: number; // Optional if not always provided
    icon?: string; // Optional if not always provided
    onAddToBag?: (quantity: number, sku_id: string) => void; // Optional if not always provided
    backgroundColor?: string; // Optional if not always provided
}

const FoodDrinkSection: React.FC<FoodDrinkSectionProps> = ({ 
    sku_id,
    icon, 
    description, 
    backgroundColor, 
    sku_name, 
    price, 
    imageSrc, 
    onAddToBag 
}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isItemAdded, setIsItemAdded] = useState(false);
    const [quantity, setQuantity] = useState(0);

    const handleImageClick = () => {
        setIsPopupOpen(true);
        
    };

    const closePopup = () => {
        if (isItemAdded) {
            console.log(`closing Popup, Quantity: ${quantity}`);
        }
        setIsPopupOpen(false);
    };

    const handleAddToBag = (quantity: number) => {
        setIsItemAdded(true);
        setQuantity(quantity);
        onAddToBag(quantity, sku_id);
    };

    return (
        <div className="food-drink-section" style={{ backgroundColor }}>
            <div className="food-drink-section-icon">{icon}</div>
            <div className="food-drink-section-sku">{sku_name}</div>
            <img 
                src={imageSrc} 
                className="food-drink-section-image" 
                onClick={handleImageClick} 
            />
            <div className="food-drink-section-description">{description}</div>
            <div className="food-drink-section-price">RM {price?.toString()}</div>

            {/* Display ProductCard */}
            {isPopupOpen && (
                <div className="popup">            
                    <div className="popup-content">
                        <ProductCard 
                            sku_id={sku_id}
                            sku_name={sku_name || ''}
                            price={price !== undefined ? price.toString() : ''}
                            imageSrc={imageSrc} 
                            onAddToBag={handleAddToBag}
                        />
                        <button onClick={closePopup} className="close-button">
                            X
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodDrinkSection;
