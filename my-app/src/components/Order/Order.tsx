import React, { useState } from 'react';
import './Order.css'; // Import the CSS file for styling
import NavBar from '../Home/NavBar.tsx';
import { useNavigate } from 'react-router-dom';

const Order: React.FC = () => { // Changed to TypeScript with type annotation
  const [activeButton, setActiveButton] = useState('');
  const navigate = useNavigate();
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
        <div className="item">
          <img src="path/to/your/image.jpg" alt="Camellia Oolong Pure Tea" />
          <div className="item-details">
            <p>CAMELLIA OOLONG PURE TEA</p>
            <p>RM 12.90</p>
            <p>REGULAR, NORMAL</p>
            <p>x 1</p>
          </div>
        </div>
        <div className="voucher">
          <button>Add voucher</button>
        </div>
        <div className="payment-details">
          <h3>Payment Details</h3>
          <p>SST 6.00%: + RM 0.73</p>
          <p>Subtotal: RM 12.90</p>
        </div>
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
          <button className="pay-button">PAY RM 12.90</button>
        </div>
      </div>
    </div>
  );
};

export default Order;