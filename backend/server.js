const express = require('express');
const dotenv = require('dotenv');
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
