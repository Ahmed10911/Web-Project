// src/pages/SignIn.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { useAuth } from '../context/AuthContext'; // To use AuthContext
import './signIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Using login from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and Password are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        login(); // Update authentication status to true
        localStorage.setItem('user', 'true'); // Store login status to localStorage
        navigate('/home'); // Navigate to Home page after successful login
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="signin-button">Sign In</button>
        </form>
        <p className="signup-redirect">
          Don't have any account?{' '}
          <span
            className="signup-link"
            onClick={() => navigate('/signup')}
          >
            Create a new one
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
