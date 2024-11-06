const express = require('express');
const { register, login, logout } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', verifyToken, logout);
// router.get('/protected', authMiddleware);

module.exports = router;
