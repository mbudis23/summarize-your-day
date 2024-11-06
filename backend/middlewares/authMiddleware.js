const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    // Mendapatkan header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Access denied" });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
      });
};

