const logRequest = (req, res, next) => {
    const start = Date.now();  // Capture the start time of the request

    res.on('finish', () => {
        const duration = Date.now() - start;  // Calculate the duration of the request
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} from ${req.ip} - Status: ${res.statusCode} - ${duration}ms`);
    });

    next();  // Continue to the next middleware
};

module.exports = logRequest;
