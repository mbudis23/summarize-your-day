const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error in register function:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000
        });

        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
};

exports.addReport = async (req, res) => {
    try {
        const userId = req.userId; // Ensure this is correctly populated, perhaps from a middleware that authenticates the token
        const { date, rate, summarize } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const reportExists = user.reports.some(report => report.date.toISOString().substring(0, 10) === new Date(date).toISOString().substring(0, 10));

        if (reportExists) {
            return res.status(400).json({ message: 'Report with this date already exists' });
        }

        user.reports.push({
            date,
            rate,
            summarize
        });

        await user.save();
        res.status(201).json({ message: 'Report added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.editReport = async (req, res) => {
    try {
        const userId = req.userId;
        const { reportId } = req.params; 
        const { rate, summarize } = req.body;

        const user = await User.findOne({ _id: userId, "reports._id": reportId });
        
        if (!user) {
            return res.status(404).json({ message: 'User or report not found' });
        }

        const report = user.reports.id(reportId);
        
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }

        if (rate) report.rate = rate;
        if (summarize) report.summarize = summarize;
        report.updatedAt = Date.now();

        await user.save();
        res.json({ message: 'Report updated successfully', report });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllReports = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select('reports');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const sortedReports = user.reports.sort((a, b) => new Date(b.date) - new Date(a.date));

        res.json({ reports: sortedReports });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getReportById = async (req, res) => {
    try {
        const userId = req.userId;
        const { reportId } = req.params;

        const user = await User.findOne({ _id: userId, "reports._id": reportId });

        if (!user) {
            return res.status(404).json({ message: 'User or report not found' });
        }

        const report = user.reports.id(reportId);

        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.json({ report });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteReportById = async (req, res) => {
    try {
        const userId = req.userId;
        const { reportId } = req.params;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const reportIndex = user.reports.findIndex(report => report._id.toString() === reportId);
        if (reportIndex === -1) {
            return res.status(404).json({ message: 'Report not found' });
        }

        user.reports.splice(reportIndex, 1);

        await user.save();
        res.json({ message: 'Report deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
