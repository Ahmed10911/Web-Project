import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // For navigation

  // Fetch products from the backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/products');
        const data = await response.json();
        console.log('Fetched Products:', data); // Log the data
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Add to cart function
  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Get cart from local storage
    const existingProduct = cart.find(item => item._id === product._id);

    if (existingProduct) {
      existingProduct.quantity += 1; // Increase quantity if product exists
    } else {
      cart.push({ ...product, quantity: 1 }); // Add new product to cart
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Update cart in local storage
    navigate('/cart'); // Redirect to cart page
  };

  return (
    <div className="home-container">
      <h1>Welcome to E-Shop</h1>
      <p>Discover amazing products at unbeatable prices.</p>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p className="product-price">${product.price}</p>
            <button 
              className="buy-button" 
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
