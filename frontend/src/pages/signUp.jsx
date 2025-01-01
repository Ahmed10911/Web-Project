import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form validation
  const validateForm = () => {
    const errors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errors.email = 'Email must be a valid Gmail address (example@gmail.com)';
    }

    // Phone validation
    const phoneRegex = /^\d{11}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      errors.phone = 'Phone number must be exactly 11 digits';
    }

    // Password validation
    if (!formData.password.trim() || formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords must match';
    }

    return errors;
  };

  // Submit form data
  const handleSignUp = async () => {
    const errors = validateForm();
    setFormErrors(errors);

    // Proceed only if no errors
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch('http://localhost:5001/api/users/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token); // Save the token in localStorage
          alert('Sign up successful!');
          navigate('/welcome'); // Navigate to the welcome page
        } else {
          const error = await response.json();
          alert(`Sign up failed: ${error.message}`);
        }
      } catch (err) {
        console.error('Error during sign up:', err);
        alert('Sign up failed. Please try again later.');
      }
    }
  };

  // Helper function to render error messages
  const renderError = (error) => error && <p className="error">{error}</p>;

  return (
    <div className="signup-container">
      <h1>Create an Account</h1>

      {/* Full Name Field */}
      <div className="form-group">
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Enter your full name"
        />
        {renderError(formErrors.fullName)}
      </div>

      {/* Email Field */}
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email (example@gmail.com)"
        />
        {renderError(formErrors.email)}
      </div>

      {/* Phone Number Field */}
      <div className="form-group">
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Enter your phone number"
        />
        {renderError(formErrors.phone)}
      </div>

      {/* Password Field */}
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
        />
        {renderError(formErrors.password)}
      </div>

      {/* Confirm Password Field */}
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm your password"
        />
        {renderError(formErrors.confirmPassword)}
      </div>

      {/* Sign Up Button */}
      <button type="button" className="signup-button" onClick={handleSignUp}>
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
