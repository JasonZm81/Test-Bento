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
    const [itemCount, setItemCount] = useState(() => {
        // Retrieve itemCount from localStorage or default to 0
        const savedItemCount = localStorage.getItem('itemCount');
        return savedItemCount ? parseInt(savedItemCount, 10) : 0;
    });
    const location = useLocation(); // Get the current location

    // Array of item objects
    const items = [
        {
            skuId: "1",
            imageSrc: "https://res.cloudinary.com/drusxooph/image/upload/v1736272076/jm5xz25uyno7j9wfv55e.jpg",
            description: "Lu-Rou Fan",
            skuName: "卤肉饭",
            price: "10.50",
            icon: "🍜",
            backgroundColor: "#faf0dc"
        },
        {
            skuId: "2",
            imageSrc: "https://res.cloudinary.com/drusxooph/image/upload/v1736272076/jm5xz25uyno7j9wfv55e.jpg",
            description: "Super Lu-Rou Fan",
            skuName: "Super 卤肉饭",
            price: "20.50",
            icon: "🍜",
            backgroundColor: "#faf0dc"
        },
        {
            skuId: "3",
            imageSrc: "https://res.cloudinary.com/drusxooph/image/upload/v1736272076/jm5xz25uyno7j9wfv55e.jpg",
            description: "Fan Fan",
            skuName: "Rou Rou Fan",
            price: "30",
            icon: "🍜",
            backgroundColor: "#faf0dc"
        },
        // Add more items as needed
    ];

    // Function to update item count and cache in localStorage. Mcm no use liap
    const updateItemCount = (quantity: number, skuId: string, skuName: string, price: string) => {
        // console.log(`updateItemCount here`); // Log the values to debug
        const newCount = itemCount + quantity; // Calculate new count directly
        setItemCount(newCount); // Update state with new count
        localStorage.setItem('itemCount', newCount.toString()); // Cache in localStorage
        localStorage.setItem(`itemCount_${skuId}`, newCount.toString()); // Cache SKU-specific count
        // localStorage.setItem(`skuName_${skuId}`, skuName); // Cache SKU-specific name
        // localStorage.setItem(`price_${skuId}`, price); // Cache SKU-specific price
        console.log(`Updated item count in browser:: ${newCount} for ${skuName} SKU: ${skuId}`); // Log the latest quantity value
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
                            {items.map((item) => (
                                <FoodDrinkSection 
                                    key={item.skuId}
                                    sku_id={item.skuId} 
                                    imageSrc={item.imageSrc} 
                                    description={item.description} 
                                    sku_name={item.skuName} 
                                    price={item.price} 
                                    icon={item.icon} 
                                    onAddToBag={(quantity) => updateItemCount(quantity, item.skuId, item.skuName, item.price)}
                                    backgroundColor={item.backgroundColor} 
                                />
                            ))}
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