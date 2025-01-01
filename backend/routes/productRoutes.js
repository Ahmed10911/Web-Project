const express = require('express');
const Product = require('../models/product');

const router = express.Router();

// Get All Products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a Product
router.post('/', async (req, res) => {
    const { name, price, image, inStock } = req.body;

    try {
        const newProduct = new Product({ name, price, image, inStock });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product' });
    }
});

module.exports = router;
