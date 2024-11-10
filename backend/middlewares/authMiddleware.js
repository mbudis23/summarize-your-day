const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    // Retrieve the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]; // Get the token from the header

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Assuming your payload has 'id' when creating the token
        req.user = decoded; // Add decoded data to the request object
        next(); // Proceed to the next middleware or request handler
    } catch (error) {
        return res.status(403).json({ message: "Invalid token. " + error.message });
    }
};
