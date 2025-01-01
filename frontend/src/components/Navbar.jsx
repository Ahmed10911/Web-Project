import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        {/* Use Link to navigate without reloading the page */}
        <Link to="/home">E-Shop</Link>  {/* Replace <a> with <Link> */}
      </div>
      <ul className="navbar-links">
        <li>
          {/* Use Link to navigate to the Home page */}
          <Link to="/home">Home</Link>  {/* Replace <a> with <Link> */}
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
