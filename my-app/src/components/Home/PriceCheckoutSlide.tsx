import React, { useState, useEffect } from 'react';
import './home-style/PriceCheckoutSlide.css';
interface PriceCheckoutSlideProps {
    itemCount: number;
    navigate: (path: string) => void;
    onClick: () => void;
}

const PriceCheckoutSlide: React.FC<PriceCheckoutSlideProps> = ({ itemCount, navigate, onClick }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [cachedData, setCachedData] = useState<string | null>(null);

    useEffect(() => {
        setIsVisible(true);

        const data = localStorage.getItem('cart');
        // console.log('Filtered Data:', data);
        if (data) {
            const parsedData = JSON.parse(data);
            const filteredData = parsedData.map((item: { imageSrc: string, sku_name: string, price: number, quantity: number }) => ({
                imageSrc: item.imageSrc,
                sku_name: item.sku_name,
                price: item.price,
                quantity: item.quantity
            }));
            console.log('Filtered Data:', filteredData);
            setCachedData(JSON.stringify(filteredData));
        } else {
            console.log('No cached data found.');
            setCachedData(null);
        }
    }, []);

    const handleIncrease = (index: number) => {
        const updatedData = JSON.parse(cachedData!).map((item: any, i: number) => {
            if (i === index) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCachedData(JSON.stringify(updatedData));
    };

    const handleDecrease = (index: number) => {
        const updatedData = JSON.parse(cachedData!).map((item: any, i: number) => {
            if (i === index && item.quantity > 0) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCachedData(JSON.stringify(updatedData));
    };

    return (
        <div className={`checkout-window slide-right ${isVisible ? 'slide-up' : ''}`} onClick={onClick}>
            <h3>{itemCount} ITEMS</h3>
            {cachedData && JSON.parse(cachedData).map((item: { imageSrc: string, sku_name: string, price: number, quantity: number }, index: number) => (
                <div key={index} className="item-container">
                    <img src={item.imageSrc} alt={item.sku_name} className="item-image" />
                    <div>
                        <h5 className="item-text">{item.sku_name}</h5>
                        <h5 className="item-price">RM {item.price}</h5>
                        <div className="quantity-container move-right">
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