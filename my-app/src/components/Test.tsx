import React, { useState, useEffect } from 'react';
import './Test.css';
interface PriceCheckoutSlideProps {
    itemCount: number;
}

const PriceCheckoutSlide: React.FC<PriceCheckoutSlideProps> = ({ itemCount}) => {
    const [cachedData, setCachedData] = useState<string | null>(null);
    const [itemCountState, setItemCount] = useState(itemCount);

    useEffect(() => {
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
        localStorage.setItem('cart', JSON.stringify(updatedData));

        const newItemCount = updatedData.reduce((total: number, item: any) => total + item.quantity, 0);
        localStorage.setItem('totalItems', JSON.stringify(newItemCount));
        setItemCount(newItemCount);
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
    };

    return (
        <div className={`slide-right scrollable`}>
            <h3>{itemCountState} ITEMS</h3>
            {cachedData && JSON.parse(cachedData).map((item: { imageSrc: string, sku_name: string, price: number, quantity: number }, index: number) => (
                <div key={index} className="item-container">
                    <img src={item.imageSrc} alt={item.sku_name} className="item-image" />
                    <div>
                        <h5 className="item-text">{item.sku_name}</h5>
                        <h5 className="item-price">RM {item.price * item.quantity}</h5>
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