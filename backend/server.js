const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const logRequest = require('./utils/logger');
const cookieParser = require('cookie-parser');
userRoute = require('./routes/userRoute');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/users', userRoute)
app.use(express.json());
app.use(logRequest);
app.use(cookieParser());
app.use(cors({ 
    origin: 'http://localhost:3000',
    credentials: true,
})); 
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

module.exports = app;