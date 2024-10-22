const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// Login Function
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const userExists = await User.findOne({ email });

        if (!userExists) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare entered password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, userExists.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create and sign JWT
        const token = jwt.sign({ email: userExists.email }, process.env.SECRET_KEY, { expiresIn: '3h' });  // Expiration set to 30 minutes for production

        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Register Function
const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        let userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving the user
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user instance
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        // Save the new user in the database
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { login, register };
