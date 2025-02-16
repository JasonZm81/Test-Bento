import React, { useState, useEffect } from 'react';
import './home-style/PriceCheckoutSlide.css';
interface PriceCheckoutSlideProps {
    itemCount: number;
    navigate: (path: string) => void;
    onClick: () => void;
    onItemCountChange?: (count: number) => void;
    onSubtotalChange?: (newSubtotal: number) => void;
}

const PriceCheckoutSlide: React.FC<PriceCheckoutSlideProps> = ({ itemCount, navigate, onClick, onItemCountChange, onSubtotalChange }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [cachedData, setCachedData] = useState<string | null>(null);
    const [itemCountState, setItemCount] = useState(itemCount);

    useEffect(() => {
        setIsVisible(true);

        const data = localStorage.getItem('cart');
        // console.log('Filtered Data:', data);
        if (data) {
            const parsedData = JSON.parse(data);
            const filteredData = parsedData.map((item: { imageSrc: string, sku_name: string, price: number, quantity: number, totalItemPrice: number }) => ({
                imageSrc: item.imageSrc,
                sku_name: item.sku_name,
                price: item.price,
                quantity: item.quantity,
                totalItemPrice: item.totalItemPrice
            }));
            console.log('Filtered Data:', filteredData);
            setCachedData(JSON.stringify(filteredData));

            // Calculate total items
            const totalItems = filteredData.reduce((total, item) => total + item.quantity, 0);
            localStorage.setItem('totalItems', JSON.stringify(totalItems));
            console.log('Total Items:', totalItems);

            // Calculate subtotal
            const subtotal = filteredData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            console.log('Calculated subtotal:', subtotal);
            onSubtotalChange?.(subtotal);
        } else {
            console.log('No cached data found.');
            setCachedData(null);
        }
    }, []);

    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden'; // Prevent body from scrolling
        } else {
            document.body.style.overflow = 'auto'; // Allow body to scroll
        }

        return () => {
            document.body.style.overflow = 'auto'; // Cleanup on unmount
        };
    }, [isVisible]);

    useEffect(() => {
        if (itemCountState === 0) {
            setIsVisible(false);
        }
    }, [itemCountState]);

    const handleIncrease = (index: number) => {
        const updatedData = JSON.parse(cachedData!).map((item: any, i: number) => {
            if (i === index) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCachedData(JSON.stringify(updatedData));
        localStorage.setItem('cart', JSON.stringify(updatedData));

        const newItemCount = updatedData.reduce((total: number, item: any) => total + item.quantity, 0);
        localStorage.setItem('totalItems', JSON.stringify(newItemCount));
        setItemCount(newItemCount);
        onItemCountChange?.(newItemCount);

        // Calculate new subtotal
        const newSubtotal = updatedData.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
        localStorage.setItem('subtotal', JSON.stringify(newSubtotal));
        onSubtotalChange?.(newSubtotal);
    };

    const handleDecrease = (index: number) => {
        const updatedData = JSON.parse(cachedData!).map((item: any, i: number) => {
            if (i === index && item.quantity > 0) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        }).filter((item: any) => item.quantity > 0);

        setCachedData(JSON.stringify(updatedData));
        localStorage.setItem('cart', JSON.stringify(updatedData));

        const newItemCount = updatedData.reduce((total: number, item: any) => total + item.quantity, 0);
        localStorage.setItem('totalItems', JSON.stringify(newItemCount));
        setItemCount(newItemCount);
        onItemCountChange?.(newItemCount);

        // Calculate new subtotal
        const newSubtotal = updatedData.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
        localStorage.setItem('subtotal', JSON.stringify(newSubtotal));
        onSubtotalChange?.(newSubtotal);
    };

    const getCheckoutWindowClass = () => {
        if (!cachedData) return '';

        const parsedData = JSON.parse(cachedData);
        const uniqueSkus = new Set(parsedData.map((item: { sku_name: string }) => item.sku_name)).size;

        if (uniqueSkus === 1) {
            return 'checkout-window1';
        } else if (uniqueSkus === 2) {
            return 'checkout-window2';
        } else if (uniqueSkus === 3) {
            return 'checkout-window3';
        } else if (uniqueSkus > 3) {
            return 'checkout-window';
        }
    };

    return (
        <div className={`${getCheckoutWindowClass()} slide-right scrollable ${isVisible ? 'slide-down' : ''}`} onClick={onClick}>
            <div className={`item-container-header`}>
                <h3> {itemCountState} ITEMS</h3>
            </div>
            {cachedData && JSON.parse(cachedData).map((item: { imageSrc: string, sku_name: string, price: number, quantity: number }, index: number) => (
                <div key={index} className="item-container">
                    <img src={item.imageSrc} alt={item.sku_name} className="item-image" />
                    <div>
                        <h5 className="item-text">{item.sku_name}</h5>
                        <h5 className="item-price">RM {item.price * item.quantity}</h5>
                        <div className="item-quantity-controls">
                            <button onClick={() => handleDecrease(index)}>-</button>
                            <h5 className="item-text">{item.quantity}</h5>
                            <button onClick={() => handleIncrease(index)}>+</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PriceCheckoutSlide; 