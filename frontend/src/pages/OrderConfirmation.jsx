import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    orderId = `ORD-${Math.floor(Math.random() * 1000000)}`,
    orderDate = new Date().toLocaleDateString(),
    shippingAddress = 'No address provided',
    paymentMethod = 'Not specified',
    totalAmount = 'N/A',
  } = location.state || {};

  return (
    <div className="order-confirmation-container">
      <h2>Order Confirmed!</h2>
      <p>Thank you for your purchase. Your order has been placed successfully.</p>

      <div className="order-details">
        <h3>Order Details</h3>
        <p><strong>Order ID:</strong> {orderId}</p>
        <p><strong>Order Date:</strong> {orderDate}</p>
        <p><strong>Shipping Address:</strong> {shippingAddress}</p>
        <p><strong>Payment Method:</strong> {paymentMethod}</p>
        <p><strong>Total Amount:</strong> {totalAmount}</p>
      </div>

      <button onClick={() => navigate('/home')} className="back-home-button">
        Return to Home
      </button>
    </div>
  );
};

export default OrderConfirmation;
