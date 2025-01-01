import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import SignUp from './pages/signUp';
import SignIn from './pages/signIn';
import Welcome from './pages/Welcome';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider

const App = () => {
  const location = useLocation();
  const hideNavbarFooter = ['/signin', '/signup'].includes(location.pathname);

  return (
    <AuthProvider>  {/* Wrap everything inside AuthProvider */}
      <div className="content-container">
        {!hideNavbarFooter && <Navbar />}
        <div className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/signin" />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected Routes */}
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
            <Route path="/welcome" element={<PrivateRoute><Welcome /></PrivateRoute>} />
            <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
            <Route path="/order-confirmation" element={<PrivateRoute><OrderConfirmation /></PrivateRoute>} />

            {/* 404 Route */}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </div>
        {!hideNavbarFooter && <Footer />}
      </div>
    </AuthProvider>
  );
};

export default App;
