const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        console.log("Register endpoint hit");  // Debug log
        const { _username, _email, _password } = req.body;
        console.log("Received data:", { _username, _email, _password });  // Debug log

        // Cek apakah email sudah terdaftar
        const existingUser = await User.findOne({ _email });
        if (existingUser) {
            console.log("Email already in use:", _email);
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(_password, 10);

        // Buat user baru
        const newUser = new User({
            _username,
            _email,
            _password: hashedPassword
        });

        // Simpan user ke database
        await newUser.save();

        console.log("User registered successfully:", _username);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error in register function:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { _email, _password } = req.body;

        // Cari user berdasarkan email
        const user = await User.findOne({ _email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verifikasi password
        const isMatch = await bcrypt.compare(_password, user._password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Buat JWT
        const token = jwt.sign(
            { id: user._id, username: user._username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Atur waktu kadaluarsa token sesuai kebutuhan
        );

        // Set cookie dengan JWT
        res.cookie('token', token, {
            httpOnly: false,      // Mencegah akses dari JavaScript di sisi klien
            secure: process.env.NODE_ENV === 'production', // Cookie hanya dikirim melalui HTTPS di produksi
            maxAge: 3600000      // 1 jam dalam milidetik
        });

        // Kirim respons ke klien
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
        const userId = req.userId;
        const { _date, _rate, _summarize } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const reportExists = user._reports.some(report => report._date.toISOString() === new Date(_date).toISOString());

        if (reportExists) {
            return res.status(400).json({ message: 'Report with this date already exists' });
        }

        user._reports.push({
            _date,
            _rate,
            _summarize
        });

        await user.save();
        res.status(201).json({ message: 'Report added successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.editReport = async (req, res) => {
    try {
        const userId = req.userId;
        const { reportId } = req.params; 
        const { _rate, _summarize } = req.body;

        const user = await User.findOne({ _id: userId, "_reports._id": reportId });
        
        if (!user) {
            return res.status(404).json({ message: 'User or report not found' });
        }

        const report = user._reports.id(reportId);
        
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }

        // if (_date) report._date = _date;
        if (_rate) report._rate = _rate;
        if (_summarize) report._summarize = _summarize;
        report._updated_at = Date.now();

        await user.save();

        res.json({ message: 'Report updated successfully', report });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllReports = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select('_reports');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const sortedReports = user._reports.sort((a, b) => new Date(b._date) - new Date(a._date));

        res.json({ reports: sortedReports });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getReportById = async (req, res) => {
    try {
        const userId = req.userId;
        const { reportId } = req.params;

        const user = await User.findOne({ _id: userId, "_reports._id": reportId });

        if (!user) {
            return res.status(404).json({ message: 'User or report not found' });
        }

        const report = user._reports.id(reportId);

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

        const reportIndex = user._reports.findIndex(report => report._id.toString() === reportId);
        if (reportIndex === -1) {
            return res.status(404).json({ message: 'Report not found' });
        }

        user._reports.splice(reportIndex, 1);

        await user.save();

        res.json({ message: 'Report deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};