import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUtensils, faClipboardList, faUser } from '@fortawesome/free-solid-svg-icons';
import FoodDrinkSection from '../Menu/FoodAndDrinks.tsx'; // Import the new component
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation
import NavBar from './NavBar.tsx';

const images = [
    { id: 1, image: 'https://res.cloudinary.com/drusxooph/image/upload/v1736170977/xnnllo9fvcefpta16k9p.webp', title: 'Title 1' },
    { id: 2, image: 'https://res.cloudinary.com/drusxooph/image/upload/v1736171430/m9w1trpsqugtdmuduwht.webp', title: 'Title 2' },
    { id: 3, image: 'https://res.cloudinary.com/drusxooph/image/upload/v1736171448/duqbxz1okohnyglqix7i.webp', title: 'Title 3' },
];

const ImageCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('FOODS');
    const [searchQuery, setSearchQuery] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(() => {
        // Check localStorage to see if the popup has been shown before
        return localStorage.getItem('popupShown') !== 'true';
    });
    const [showMenuItems, setShowMenuItems] = useState(false);
    const [activeButton, setActiveButton] = useState('');
    let touchStartX = 0;
    let touchEndX = 0;
    const [isSliding, setIsSliding] = useState(false);
    const searchBarRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate(); // Initialize useNavigate
    const location = useLocation(); // Get the current location

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3500); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    useEffect(() => {
        // Set the popupShown flag in localStorage when the popup is closed
        if (!isPopupVisible) {
            localStorage.setItem('popupShown', 'true');
        }
    }, [isPopupVisible]);

    useEffect(() => {
        // Set active button based on the current path
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

    const handleTouchStart = (e: TouchEvent) => {
        touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchMove = (e: TouchEvent) => {
        touchEndX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = () => {
        if (touchStartX - touchEndX > 50) {
            // Swipe left
            setIsSliding(true);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }

        if (touchEndX - touchStartX > 50) {
            // Swipe right
            setIsSliding(true);
            setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        }
    };

    return (
        <div style={{ 
            position: 'relative', 
            minHeight: '100vh', 
            maxWidth: '1200px',  
            margin: '0 auto',    
            padding: '0 0px',   
        }}>
            {/* Popup Ad */}
            {isPopupVisible && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '0px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    zIndex: 1000,
                    width: '92%',  // Increased width to 80%
                    maxWidth: '600px',  // Set a max width for larger screens
                    height: 'auto',  // Allow height to adjust based on content
                }}>
                    <button onClick={() => setIsPopupVisible(false)} style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'none',
                        border: 'none',
                        fontSize: '30px',
                        cursor: 'pointer',
                        color: 'black',
                        textShadow: '0 0 15px white',
                    }}>✖</button>
                    <img src="https://res.cloudinary.com/drusxooph/image/upload/v1736272076/jm5xz25uyno7j9wfv55e.jpg" alt="Ad" style={{ width: '100%', borderRadius: '8px' }} />
                </div>
            )}

            {/* Carousel Section */}
            <div
                style={{
                    width: '100%',  // Set to 100% of the container
                    maxWidth: '800px',  // Set a max width for the carousel
                    margin: '0 auto',  // Center the carousel
                    overflow: 'hidden',
                    // borderRadius: '15px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                    position: 'relative',
                    backgroundColor: '#f5f5f5',
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={() => {
                    handleTouchEnd();
                    setTimeout(() => setIsSliding(false), 300);
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        transition: isSliding ? 'transform 0.3s ease' : 'none',
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                >
                    {images.map((image, index) => (
                        <div key={image.id} style={{ minWidth: '100%', position: 'relative' }}>
                            <img src={image.image} alt={image.title} style={{ width: '100%', borderRadius: '8px 8px 0 0' }} />
                            <div
                                style={{
                                    position: 'relative',
                                    margin: '20px',
                                    maxWidth: '600px',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    overflow: 'visible',
                                }}
                                ref={searchBarRef}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '-35px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        display: 'flex',
                                        gap: '5px',
                                    }}
                                >
                                    {images.map((_, dotIndex) => (
                                        <div
                                            key={dotIndex}
                                            onClick={() => setCurrentIndex(dotIndex)}
                                            style={{
                                                width: '10px',
                                                height: '10px',
                                                borderRadius: '50%',
                                                backgroundColor: currentIndex === dotIndex ? 'black' : 'white',
                                                cursor: 'pointer',
                                            }}
                                        />
                                    ))}
                                </div>
                                {/* First div - Welcom back div */}
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        padding: '20px',
                                        backgroundColor: '#fff',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                        margin: '20px 0',
                                        maxWidth: '600px',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        width: '80%',
                                        marginTop: '-60px',
                                    }}
                                >
                                    
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Welcome back, User123!</span>
                                        <img
                                            src="https://res.cloudinary.com/drusxooph/image/upload/v1736171448/duqbxz1okohnyglqix7i.webp"
                                            alt="User Thumbnail"
                                            style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2px solid #ddd' }}
                                        />
                                    </div>
                                    <hr style={{ width: '100%', border: 'none', borderTop: '1px solid #ddd', margin: '15px 0' }} />
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-around',
                                            width: '100%',
                                            backgroundColor: '#fff',
                                            // borderRadius: '8px',
                                            // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                            padding: '5px',
                                        }}
                                    >
                                        {/* wallet, tea, vouncher */}
                                        <div style={{ textAlign: 'center' }}>
                                            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>0.00</span>
                                            <div style={{ fontSize: '12px', color: '#888' }}>WALLET(RM)</div>
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>30</span>
                                            <div style={{ fontSize: '12px', color: '#888' }}>TEA LEAVES</div>
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>0</span>
                                            <div style={{ fontSize: '12px', color: '#888' }}>VOUCHERS</div>
                                        </div>
                                    </div>

                                    

                                   
                                </div>
                                {/* Menu div */}
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        padding: '20px',
                                        backgroundColor: '#fff',
                                        borderRadius: '15px',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                        margin: '20px 0',
                                        maxWidth: '600px',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        width: '80%',
                                        marginTop: '20px',
                                    }}
                                >
                                    {/* Search bar with modern design */}
                                    <div style={{
                                        position: 'relative',
                                        width: '90%',
                                        margin: '5px 15px 0px 0'
                                    }}>
                                        <input
                                            type="text"
                                            placeholder="Search for foods and drinks..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            style={{
                                                width: '80%',
                                                padding: '12px 40px',
                                                borderRadius: '25px',
                                                border: '1px solid #eee',
                                                backgroundColor: '#f8f9fa',
                                                fontSize: '14px',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                                transition: 'all 0.3s ease'
                                            }}
                                        />
                                        <span style={{
                                            position: 'absolute',
                                            left: '15px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: '#666'
                                        }}>
                                            🔍
                                        </span>
                                    </div>

                                    {/* Foods and Drinks buttons */}
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            marginTop: '20px',
                                            width: '100%',
                                        }}
                                    >
                                        {['FOODS', 'DRINKS'].map((tab) => (
                                            <div
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                style={{
                                                    padding: '10px 20px',
                                                    cursor: 'pointer',
                                                    borderBottom: activeTab === tab ? '2px solid #d9534f' : 'none',
                                                    fontWeight: activeTab === tab ? 'bold' : 'normal',
                                                }}
                                            >
                                                {tab}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Updated Foods and Drinks sections */}
                                    <div
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(2, 1fr)',
                                            gap: '15px',
                                            marginTop: '20px',
                                            width: '100%',
                                        }}
                                    >
                                        {activeTab === 'FOODS' ? (
                                            <>
                                                <FoodDrinkSection title="PICKUP" icon="🍔" description="Ready in 15 mins" backgroundColor="#faf0dc" />
                                                <FoodDrinkSection imageSrc="https://res.cloudinary.com/drusxooph/image/upload/v1736272076/jm5xz25uyno7j9wfv55e.jpg" description="Lu-Rou Fan" backgroundColor="#e8f5e9" sku_name="卤肉饭" price="RM8.70"/>
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
                                                <FoodDrinkSection title="DINE IN" icon="🥡" description="Table service" backgroundColor="#e8f5e9" />
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
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <NavBar 
                activeButton={activeButton} 
                setActiveButton={setActiveButton} 
                navigate={navigate} 
            />
        </div>
    );
};

export default ImageCarousel;