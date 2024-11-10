const express = require('express');
const {
    register,
    login,
    logout,
    addReport,
    editReport,
    getAllReports,
    getReportById,
    deleteReportById
} = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

// User authentication routes
router.post('/register', register);
router.post('/login', login);
router.get('/logout', verifyToken, logout);  // Changed to GET for more conventional approach if it doesn't change server-side state

// Reports management routes
router.post('/reports', verifyToken, addReport);          // Changed to '/reports' for clarity
router.put('/reports/:reportId', verifyToken, editReport);  // It's clearer to use '/reports/:reportId'
router.get('/reports', verifyToken, getAllReports);        // Fetch all reports
router.get('/reports/:reportId', verifyToken, getReportById);  // Fetch a single report by ID
router.delete('/reports/:reportId', verifyToken, deleteReportById);  // Delete a report

module.exports = router;
