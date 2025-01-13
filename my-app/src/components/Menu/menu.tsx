import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUtensils, faClipboardList, faUser, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import FoodDrinkSection from './FoodAndDrinks.tsx'; // Import the new component
import { useNavigation } from '../../NavigationContext.tsx'; // Import the useNavigation hook
import ProductCard from './ProductCard.tsx'; // Import the ProductCard component
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation
import './menu-style/menu.css'; // Import the new CSS file
import NavBar from '../Home/NavBar.tsx';

const Menu = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('FOODS');
    const [searchQuery, setSearchQuery] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(true);
    const [showMenuItems, setShowMenuItems] = useState(false);
    const [activeButton, setActiveButton] = useState('');
    let touchStartX = 0;
    let touchEndX = 0;
    const [isSliding, setIsSliding] = useState(false);
    const searchBarRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate(); // Initialize useNavigate
    const { activeButton: globalActiveButton, setActiveButton: globalSetActiveButton } = useNavigation(); // Use the global state
    const [isOpen, setIsOpen] = useState(false);
    const [itemCount, setItemCount] = useState(0);
    const location = useLocation(); // Get the current location

    // Function to update item count
    const updateItemCount = (quantity: number) => {
        setItemCount(prevCount => prevCount + quantity);
    };

    // Scroll to the top of the page
    useEffect(() => {
        window.scrollTo(0, 0); 
    }, []);

    // Set active button based on the current path
    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setActiveButton('home');
                break;
            case '/menu':
                setActiveButton('menu');
                break;
            case '/order':
                setActiveButton('order');
                break;
            case '/me':
                setActiveButton('me');
                break;
            default:
                setActiveButton('');
        }
    }, [location.pathname]); // Update active button when the path changes

    return (
        <div className="menu-container">
            {/* Small div above Menu div */}
            <div className="menu-space"></div>

            {/* Menu div */}
            <div className="menu-div">
                {/* Search bar with modern design */}
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search for foods and drinks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <span className="search-icon">
                        🔍
                    </span>
                </div>

                {/* Foods and Drinks buttons */}
                <div className="tab-buttons">
                    {['FOODS', 'DRINKS'].map((tab) => (
                        <div
                            key={tab}
                            onClick={() => {
                                setActiveTab(tab);
                            }}
                            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                        >
                            {tab}
                        </div>
                    ))}
                </div>

                {/* Updated Foods and Drinks sections */}
                <div className="food-drink-grid">
                    {activeTab === 'FOODS' ? (
                        <>
                            <FoodDrinkSection 
                                imageSrc="https://res.cloudinary.com/drusxooph/image/upload/v1736272076/jm5xz25uyno7j9wfv55e.jpg" 
                                description="Lu-Rou Fan" 
                                sku_name="卤肉饭" 
                                price="8.70" 
                                icon="🍜" 
                                onAddToBag={updateItemCount}
                                backgroundColor="#faf0dc" 
                            />
                            <FoodDrinkSection 
                                imageSrc="https://res.cloudinary.com/drusxooph/image/upload/v1736272076/jm5xz25uyno7j9wfv55e.jpg" 
                                description="Lu-Rou Fan" 
                                backgroundColor="#e8f5e9" 
                                sku_name="卤肉饭" 
                                price="RM8.70" 
                                icon="🍜" 
                                onAddToBag={updateItemCount} // Pass the function
                            />
                            <FoodDrinkSection title="PICKUP" icon="🍔" description="Ready in 15 mins" backgroundColor="#faf0dc" />
                            <FoodDrinkSection title="DINE IN" icon="🥡" description="Table service" backgroundColor="#e8f5e9" />
                            <FoodDrinkSection title="PICKUP" icon="🍔" description="Ready in 15 mins" backgroundColor="#faf0dc" />
                            <FoodDrinkSection title="DINE IN" icon="🥡" description="Table service" backgroundColor="#e8f5e9" />
                            <FoodDrinkSection title="PICKUP" icon="🍔" description="Ready in 15 mins" backgroundColor="#faf0dc" />
                            <FoodDrinkSection title="DINE IN" icon="🥡" description="Table service" backgroundColor="#e8f5e9" />
                            <FoodDrinkSection title="PICKUP" icon="🍔" description="Ready in 15 mins" backgroundColor="#faf0dc" />
                            <FoodDrinkSection title="DINE IN" icon="🥡" description="Table service" backgroundColor="#e8f5e9" />
                            <FoodDrinkSection title="PICKUP" icon="🍔" description="Ready in 15 mins" backgroundColor="#faf0dc" />
                            <FoodDrinkSection title="DINE IN" icon="🥡" description="Table service" backgroundColor="#e8f5e9" />
                            <FoodDrinkSection title="PICKUP" icon="🍔" description="Ready in 15 mins" backgroundColor="#faf0dc" />
                            <FoodDrinkSection title="DINE IN" icon="🥡" description="Table service" backgroundColor="#e8f5e9" />
                            <FoodDrinkSection title="PICKUP" icon="🍔" description="Ready in 15 mins" backgroundColor="#faf0dc" />
                            <FoodDrinkSection title="DINE IN" icon="🥡" description="Table service" backgroundColor="#e8f5e9" />
                            <FoodDrinkSection title="PICKUP" icon="🍔" description="Ready in 15 mins" backgroundColor="#faf0dc" />
                            <FoodDrinkSection title="DINE IN" icon="🥡" description="Table service" backgroundColor="#e8f5e9" />
                            <FoodDrinkSection title="PICKUP" icon="🍔" description="Ready in 15 mins" backgroundColor="#faf0dc" />
                            <FoodDrinkSection title="DINE IN" icon="🥡" description="Table service" backgroundColor="#e8f5e9" />
                            <FoodDrinkSection title="PICKUP" icon="🍔" description="Ready in 15 mins" backgroundColor="#faf0dc" />
                            <FoodDrinkSection title="DINE IN" icon="🥡🥡🥡" description="Table service" backgroundColor="#e8f5e9" />
                            <FoodDrinkSection title="PICKUP" icon="🍔" description="Ready in 15 mins" backgroundColor="#faf0dc" />
                            <FoodDrinkSection title="DINE IN" icon="🥡" description="Table service" backgroundColor="#e8f5e9" />

                            {/* Add more sections as needed */}
                        </>
                    ) : (
                        <>
                            <FoodDrinkSection title="COLD DRINKS" icon="🥤" description="Refreshing options" backgroundColor="#e3f2fd" />
                            <FoodDrinkSection title="HOT DRINKS" icon="☕" description="Perfect brew" backgroundColor="#fff3e0" />
                            {/* Add more sections as needed */}
                        </>
                    )}
                </div>
            </div>

            {/* Navigation Buttons */}
            <NavBar 
                activeButton={activeButton} 
                setActiveButton={setActiveButton} 
                navigate={navigate} 
                itemCount={itemCount} 
                onCheckout={() => {/* Add checkout functionality here if needed */}} // Pass checkout function if needed
            />
        </div>
    );
};



export default Menu;