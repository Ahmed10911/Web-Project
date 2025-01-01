const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import User model

router.post('/signup', async (req, res) => {
    const { fullName, email, phone, password } = req.body; // Ensure 'phone' matches the schema

    if (!fullName || !email || !phone || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: fullName,
            email,
            phone, // Use 'phone' here to match the schema
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ success: true, message: 'Sign-up successful!' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Email or Phone number already exists.',
            });
        }
        console.error('Error during sign-up:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.',
        });
    }
});


// Sign-in route
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and Password are required.' });
    }

    try {
        // Check if user exists with the provided email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Email or Password is incorrect.' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Email or Password is incorrect.' });
        }

        // Authentication successful, respond with success message
        res.status(200).json({ success: true, message: 'Sign-in successful!' });

    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).json({ success: false, message: 'Internal server error. Please try again later.' });
    }
});


module.exports = router;
