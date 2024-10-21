const jwt = require('jsonwebtoken');
require('dotenv').config();
const authMiddleware = async (req, res, next) => {
    // Check for token in the Authorization header
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token available!' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET_KEY); // Remove 'Bearer ' prefix
        req.email = decoded.email;  // Add the decoded email to the request object for further use
        next();  // Continue to the next middleware/route handler
    } catch (error) {
        return res.status(401).json({ message: 'Access Denied. Invalid or expired token!' });
    }
};

module.exports = authMiddleware;
