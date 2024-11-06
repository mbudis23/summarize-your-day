const express = require('express');
const { register, login, logout, addReport, editReport, getAllReports, getReportById, deleteReportById } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', verifyToken, logout);
router.post('/', verifyToken, addReport);
router.put('/:reportId', verifyToken, editReport);
router.get('/', verifyToken, getAllReports);
router.get('/:reportId', verifyToken, getReportById);
router.delete('/:reportId', verifyToken, deleteReportById);

module.exports = router;
