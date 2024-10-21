const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRouter');
const movieRoutes = require('./routes/movieRoutes');
const authMiddleware = require('./controllers/authMiddleware');
const cors=require('cors');
// Initialize app and load environment variables
dotenv.config();
const app = express();

// Connect to the database
connectDB();
app.use(cors());

app.get("/", (req, res) => res.send("Express on Vercel"));



// Middleware to parse JSON requests
app.use(express.json());

// Public routes (no authentication required)
app.use('/api/user', userRoutes); // Registration and login routes

// Protected routes (authentication required)
app.use('/api/movies', authMiddleware, movieRoutes); // Movie routes

// Start the server on the port from environment or default to 5000
module.exports = app;