const express = require('express');
const { register, login, logout, addReport } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', verifyToken, logout);
router.post('/', verifyToken, addReport);

module.exports = router;
