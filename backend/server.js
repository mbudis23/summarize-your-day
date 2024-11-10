const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const logRequest = require('./utils/logger');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/userRoute');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for cookies and logging
app.use(cookieParser());
app.use(morgan('dev'));
app.use(logRequest);

// CORS setup
app.use(cors({
    origin: 'http://localhost:3000',               // Adjust this as needed for security in production
    credentials: true,         // This might not be functional with origin set to '*'
}));

// User routes
app.use('/api/users', userRoute);

// Set the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

module.exports = app;
