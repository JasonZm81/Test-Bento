import React, { useState, useEffect } from 'react';
import './Order.css'; // Import the CSS file for styling
import { useNavigate, useLocation } from 'react-router-dom';
interface PriceCheckoutSlideProps {
  itemCount: number;
  onItemCountChange?: (count: number) => void;
}

const Order: React.FC<PriceCheckoutSlideProps> = ({ itemCount, onItemCountChange }) => {
  const [activeButton, setActiveButton] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to access navigation state
  const [cachedData, setCachedData] = useState<string | null>(null);
  const [itemCountState, setItemCount] = useState(itemCount);
  const [totalItems, setTotalItems] = useState(0);

  // Retrieve subtotal from navigation state
  const subtotal = location.state?.subtotal || 0;

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
        const total = filteredData.reduce((total, item) => total + item.quantity, 0);
        setTotalItems(total);
        localStorage.setItem('totalItems', JSON.stringify(total));
        console.log('Total Items:', total);
    } else {
        console.log('No cached data found.');
        setCachedData(null);
        setTotalItems(0);
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
    onItemCountChange?.(newItemCount);
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
};
  
  return (
    <div className="order-container">
      <h1 className="order-title">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="back-arrow"
          viewBox="0 0 16 16"
          onClick={() => navigate(-1)} // Navigate back on click
        >
          <path fillRule="evenodd" d="M11.3 1.3a1 1 0 0 1 0 1.4L5.4 8l5.9 5.3a1 1 0 0 1-1.4 1.4l-7-6.3a1 1 0 0 1 0-1.4l7-6.3a1 1 0 0 1 1.4 0z" />
        </svg>
        Your Order
      </h1>
      <div className="order-summary">
        <h2>ORDER SUMMARY</h2>
        <div>
            <h3>{totalItems} ITEMS</h3>
            {cachedData && JSON.parse(cachedData).map((item: { imageSrc: string, sku_name: string, price: number, quantity: number }, index: number) => (
                <div key={index} className="item-container">
                    <img src={item.imageSrc} alt={item.sku_name} className="item-image" />
                    <div className="item-info">
                        <h5 className="item-name">{item.sku_name}</h5>
                        <h5 className="item-price ">RM {item.price * item.quantity}</h5>
                        <div className="quantity-container">
                            {/* <button onClick={() => handleDecrease(index)}>-</button> */}
                            <h5 className="item-text">x {item.quantity}</h5>
                            {/* <button onClick={() => handleIncrease(index)}>+</button> */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
        <div className="voucher">
          <button>Add voucher</button>
        </div>
        <div className="payment-details">
          <h3>Payment Details</h3>
          <p>SST 6.00%: + RM 0.73</p>
          <p><strong>Subtotal</strong>: RM {subtotal}</p>
        </div>

      <div className="payment-methods">
        <h3>PAYMENT METHODS</h3>
        <p className="warning">Please enable pop-up windows in your browser settings to proceed with the payment.</p>
        <div className="methods">
          <label>
            <input type="radio" name="payment" value="credit" />
            Credit/ Debit card
          </label>
          <label>
            <input type="radio" name="payment" value="touchngo" />
            Touch'n'go
          </label>
          <label>
            <input type="radio" name="payment" value="grabpay" />
            Grabpay
          </label>
        </div>
        {/* ecxtra */}
        <div className="methods">
          <label>
            <input type="radio" name="payment" value="credit" />
            Credit/ Debit card
          </label>
          <label>
            <input type="radio" name="payment" value="touchngo" />
            Touch'n'go
          </label>
          <label>
            <input type="radio" name="payment" value="grabpay" />
            Grabpay
          </label>
        </div>
        <div className="pay-button-container">
          <button className="pay-button">PAY RM {subtotal}</button>
        </div>
      </div>
    </div>
  );
};

export default Order;