import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUtensils, faClipboardList, faUser, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import PriceCheckoutSlide from './PriceCheckoutSlide.tsx';
import './home-style/NavBar.css';

interface NavBarProps {
    activeButton: string;
    setActiveButton: (button: string) => void;
    navigate: (path: string, options?: { state?: any }) => void;
    subtotal: number;
}

const NavBar: React.FC<NavBarProps> = ({ activeButton, setActiveButton, navigate }) => {
    const [isCheckoutVisible, setCheckoutVisible] = useState(false);
    const [itemCount, setItemCount] = useState<number>(0); // Initialize itemCount state
    const [subtotal, setSubtotal] = useState<number>(0); // Initialize subtotal state
    const checkoutRef = useRef<HTMLDivElement | null>(null); // Reference for the checkout slide

    // Function to update itemCount from localStorage
    useEffect(() => { 
        const updateItemCount = () => {
            const storedItemCount = JSON.parse(localStorage.getItem('totalItems') || '0');
            setItemCount(storedItemCount);
        };

        // Initial update
        updateItemCount();

        // Listen for storage changes
        window.addEventListener('storage', updateItemCount);

        // Custom event listener for cart updates
        window.addEventListener('cartUpdated', updateItemCount);

        return () => {
            window.removeEventListener('storage', updateItemCount);
            window.removeEventListener('cartUpdated', updateItemCount);
        };
    }, []);
    
    // Function to update subtotal from localStorage
    useEffect(() => {
        const updateSubtotal = () => {
            const storedSubtotal = JSON.parse(localStorage.getItem('subtotal') || '0');
            console.log('Fetched subtotal from localStorage:', storedSubtotal); // Debug log
            setSubtotal(storedSubtotal);
        };

        // Initial update
        updateSubtotal();

        // Listen for storage changes
        window.addEventListener('storage', updateSubtotal);

        // Custom event listener for subtotal updates
        window.addEventListener('subtotalUpdated', updateSubtotal);

        return () => {
            window.removeEventListener('storage', updateSubtotal);
            window.removeEventListener('subtotalUpdated', updateSubtotal);
        };
    }, []);

    const toggleCheckout = () => {
        setCheckoutVisible(!isCheckoutVisible);

        // Log all data from localStorage
        // console.log('LocalStorage Data:');
        // for (let i = 0; i < localStorage.length; i++) {
        //     const key = localStorage.key(i);
        //     if (key) {
        //         const value = localStorage.getItem(key);
        //         console.log(`${key}: ${value}`);
        //     }
        // }
    };

    // Close checkout when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (checkoutRef.current && !checkoutRef.current.contains(event.target as Node)) {
                setCheckoutVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    return (
        <>
            <div className="navbar-container">
                {/* Price and Checkout Row */}
                {itemCount > 0 && (
                    <div className="checkout-row" onClick={toggleCheckout}>
                        <div className="checkout-content">
                            <FontAwesomeIcon icon={faShoppingBag} className="checkout-icon" />
                            <div className="checkout-item-count">
                                {itemCount}
                            </div>
                            <div className="checkout-total">
                                RM {subtotal}
                            </div>
                        </div>
                        <button className="checkout-button" onClick={() => navigate('/order', { state: { subtotal } })}>
                            CHECK OUT
                        </button>
                    </div>
                )}
                {/* Navigation Bar */}
                <div className="navbar">
                    <div className={`nav-item ${activeButton === 'home' ? 'active' : ''}`} 
                         onMouseEnter={(e) => e.currentTarget.classList.add('hover')} 
                         onMouseLeave={(e) => e.currentTarget.classList.remove('hover')} 
                         onClick={() => {
                             setActiveButton('home');
                             navigate('/'); // Route to home page
                         }}>
                        <FontAwesomeIcon icon={faHome} className="nav-icon" />
                        <div>Home</div>
                    </div>
                    <div className={`nav-item ${activeButton === 'menu' ? 'active' : ''}`} 
                         onMouseEnter={(e) => e.currentTarget.classList.add('hover')} 
                         onMouseLeave={(e) => e.currentTarget.classList.remove('hover')} 
                         onClick={() => {
                             setActiveButton('menu');
                             navigate('/menu'); // Route to menu page
                         }}>
                        <FontAwesomeIcon icon={faUtensils} className="nav-icon" />
                        <div>Menu</div>
                    </div>
                    <div className={`nav-item ${activeButton === 'order' ? 'active' : ''}`} 
                         onMouseEnter={(e) => e.currentTarget.classList.add('hover')} 
                         onMouseLeave={(e) => e.currentTarget.classList.remove('hover')} 
                         onClick={() => {
                             setActiveButton('order');
                             navigate('/invoice'); // Route to order page
                         }}>
                        <FontAwesomeIcon icon={faClipboardList} className="nav-icon" />
                        <div>Order</div>
                    </div>
                    <div className={`nav-item ${activeButton === 'me' ? 'active' : ''}`} 
                         onMouseEnter={(e) => e.currentTarget.classList.add('hover')} 
                         onMouseLeave={(e) => e.currentTarget.classList.remove('hover')} 
                         onClick={() => {
                             setActiveButton('me');
                             navigate('/me'); // Route to me page
                         }}>
                        <FontAwesomeIcon icon={faUser} className="nav-icon" />
                        <div>Me</div>
                    </div>
                </div>
            </div>
            {/* Price Checkout Slide Window */}
            {isCheckoutVisible && (
                <div ref={checkoutRef} className="price-checkout-slide-window">
                    <PriceCheckoutSlide 
                        itemCount={itemCount} 
                        navigate={navigate} 
                        onClick={() => {}}
                        onItemCountChange={(count) => setItemCount(count)}
                        onSubtotalChange={(newSubtotal) => {
                            setSubtotal(newSubtotal);
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default NavBar; 