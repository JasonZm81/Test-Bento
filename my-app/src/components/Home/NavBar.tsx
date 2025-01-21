import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUtensils, faClipboardList, faUser, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import PriceCheckoutSlide from './PriceCheckoutSlide.tsx';

interface NavBarProps {
    activeButton: string;
    setActiveButton: (button: string) => void;
    navigate: (path: string) => void;
    itemCount: number;
    onCheckout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ activeButton, setActiveButton, navigate, itemCount }) => {
    const [isCheckoutVisible, setCheckoutVisible] = useState(false);
    const checkoutRef = useRef<HTMLDivElement | null>(null); // Reference for the checkout slide

    const toggleCheckout = () => {
        setCheckoutVisible(!isCheckoutVisible);
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
        <div style={{
            position: 'fixed',
            bottom: '0',
            left: '0',
            width: '100%',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 2000,
        }}>
            {/* Price and Checkout Row */}
            {itemCount > 0 && (
            <div className="checkout-row" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0px 25px',
                backgroundColor: '#f0f0f0',
                borderRadius: '0px',
                boxShadow: '0 4px 25px rgba(0, 0, 0, 0.15)',
                position: 'relative',
                transition: 'background-color 0.3s ease',
            }} onClick={toggleCheckout}>
                <div className="checkout-content" style={{ display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faShoppingBag} className="checkout-icon" style={{ marginRight: '10px', marginTop: '-5px', color: '#8B0000', fontSize: '30px' }} />
                    <div className="checkout-item-count" style={{
                        backgroundColor: '#fff',
                        marginLeft: '-15px',
                        marginTop: '20px',
                        fontWeight: 'bold',
                        fontSize: '13px',
                        border: '2px solid rgba(139, 0, 0, 0.5)',
                        borderRadius: '30%',
                        padding: '0px 2.5px',
                        display: 'inline-block',
                    }}>
                        {itemCount}
                    </div>
                    <div className="checkout-total" style={{ position: 'fixed', marginLeft: '65px', fontWeight: 'bold' }}>
                        RM {itemCount * 12.90}
                    </div>
                </div>
                <button className="checkout-button modern-button" style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0px',
                    padding: '15px 20px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    transition: 'background-color 0.3s ease',
                    marginRight: '-25px',
                }} onClick={() => navigate('/order')}>
                    CHECK OUT
                </button>
            </div>
            )}
            {/* Price Checkout Slide Window */}
            {isCheckoutVisible && (
                <div ref={checkoutRef}>
                    <PriceCheckoutSlide itemCount={itemCount} navigate={navigate} onClick={() => {}} />
                </div>
            )}
            {/* Navigation Bar */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                padding: '10px 0',
                boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
                // zIndex: 5000,
            }}>
                <div style={{ textAlign: 'center', padding: '0px', borderRadius: '20px', transition: 'background-color 0.3s, color 0.3s', cursor: 'pointer', color: activeButton === 'home' ? 'black' : 'grey' }} 
                     onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'} 
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'} 
                     onClick={() => {
                         setActiveButton('home');
                         navigate('/'); // Route to home page
                     }}>
                    <FontAwesomeIcon icon={faHome} style={{ fontSize: '20px', color: activeButton === 'home' ? 'black' : 'grey' }} />
                    <div>Home</div>
                </div>
                <div style={{ textAlign: 'center', padding: '0px', borderRadius: '20px', transition: 'background-color 0.3s, color 0.3s', cursor: 'pointer', color: activeButton === 'menu' ? 'black' : 'grey' }} 
                     onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'} 
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'} 
                     onClick={() => {
                         setActiveButton('menu');
                         navigate('/menu'); // Route to menu page
                     }}>
                    <FontAwesomeIcon icon={faUtensils} style={{ fontSize: '20px', color: activeButton === 'menu' ? 'black' : 'grey' }} />
                    <div>Menu</div>
                </div>
                <div style={{ textAlign: 'center', padding: '0px', borderRadius: '20px', transition: 'background-color 0.3s, color 0.3s', cursor: 'pointer', color: activeButton === 'order' ? 'black' : 'grey' }} 
                     onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'} 
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'} 
                     onClick={() => {
                         setActiveButton('order');
                         navigate('/order'); // Route to order page
                     }}>
                    <FontAwesomeIcon icon={faClipboardList} style={{ fontSize: '20px', color: activeButton === 'order' ? 'black' : 'grey' }} />
                    <div>Order</div>
                </div>
                <div style={{ textAlign: 'center', padding: '0px', borderRadius: '20px', transition: 'background-color 0.3s, color 0.3s', cursor: 'pointer', color: activeButton === 'me' ? 'black' : 'grey' }} 
                     onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'} 
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'} 
                     onClick={() => {
                         setActiveButton('me');
                         navigate('/me'); // Route to me page
                     }}>
                    <FontAwesomeIcon icon={faUser} style={{ fontSize: '20px', color: activeButton === 'me' ? 'black' : 'grey' }} />
                    <div>Me</div>
                </div>
            </div>
        </div>
    );
};

export default NavBar; 