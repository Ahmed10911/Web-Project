import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];

  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [bankName, setBankName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!address || !paymentMethod) {
      setErrorMessage('Please fill all the required fields.');
      return;
    }

    if (paymentMethod === 'credit-card' && (!cardNumber || !expiryDate || !cvv)) {
      setErrorMessage('Please provide complete credit card details.');
      return;
    }

    if (paymentMethod === 'paypal' && !paypalEmail) {
      setErrorMessage('Please provide your PayPal email.');
      return;
    }

    if (paymentMethod === 'bank-transfer' && (!bankAccount || !bankName)) {
      setErrorMessage('Please provide complete bank transfer details.');
      return;
    }

    setErrorMessage('');

    navigate('/order-confirmation', {
      state: {
        orderId: `ORD-${Math.floor(Math.random() * 1000000)}`,
        orderDate: new Date().toLocaleDateString(),
        shippingAddress: address,
        paymentMethod,
        totalAmount: `$${totalAmount}`,
      },
    });
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label htmlFor="address">Shipping Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter your shipping address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="payment-method">Payment Method</label>
          <select
            id="payment-method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="">Select Payment Method</option>
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank-transfer">Bank Transfer</option>
          </select>
        </div>

        {paymentMethod === 'credit-card' && (
          <div className="credit-card-info">
            <div className="form-group">
              <label htmlFor="card-number">Card Number</label>
              <input
                type="text"
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="expiry-date">Expiry Date</label>
              <input
                type="text"
                id="expiry-date"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        {paymentMethod === 'paypal' && (
          <div className="paypal-info">
            <div className="form-group">
              <label htmlFor="paypal-email">PayPal Email</label>
              <input
                type="email"
                id="paypal-email"
                placeholder="example@paypal.com"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        {paymentMethod === 'bank-transfer' && (
          <div className="bank-transfer-info">
            <div className="form-group">
              <label htmlFor="bank-account">Bank Account Number</label>
              <input
                type="text"
                id="bank-account"
                placeholder="Enter your bank account number"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bank-name">Bank Name</label>
              <input
                type="text"
                id="bank-name"
                placeholder="Enter the bank name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        <div className="order-summary">
          <h3>Order Summary</h3>
          <p><strong>Total Amount:</strong> ${totalAmount}</p>
        </div>

        <button type="submit" className="proceed-button">Proceed to Payment</button>
      </form>
    </div>
  );
};

export default Checkout;
