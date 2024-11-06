const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { _username, _email, _password } = req.body;

        // Cek apakah email sudah terdaftar
        const existingUser = await User.findOne({ _email });
        if (existingUser) {
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

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
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
