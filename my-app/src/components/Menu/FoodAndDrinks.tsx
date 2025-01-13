import React, { useState } from 'react';
import ProductCard from './ProductCard.tsx';
import { db } from '../../firebaseConfig.ts';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import './menu-style/FoodAndDrinks.css';

// Pass data props frm 
interface FoodDrinkSectionProps {
    icon: string;
    description: string;
    backgroundColor: string;
    sku_name: string;
    price: string;
    imageSrc: string;
    onAddToBag: (quantity: number) => void;
}

const FoodDrinkSection: React.FC<FoodDrinkSectionProps> = ({ icon, description, backgroundColor, sku_name, price, imageSrc, onAddToBag }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isItemAdded, setIsItemAdded] = useState(false);
    const [quantity, setQuantity] = useState(0);

    const handleImageClick = () => {
        setIsPopupOpen(true);
        
    };

    const closePopup = () => {
        if (isItemAdded) {
            console.log(`Quantity: ${quantity}`);
        }
        setIsPopupOpen(false);
    };

    const handleAddToBag = (quantity: number) => {
        setIsItemAdded(true);
        setQuantity(quantity);
        onAddToBag(quantity);
        
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
            <div className="food-drink-section-price">{price}</div>

            {/* Display ProductCard */}
            {isPopupOpen && (
                <div className="popup">            
                    <div className="popup-content">
                        <ProductCard 
                            sku_name={sku_name} 
                            price={price} 
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
