const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

userRoute = require('./routes/userRoute');

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

app.use('/api/users', userRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
