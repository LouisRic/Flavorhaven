const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// Register user baru
router.post('/register', userController.registerUser);
// Login user
router.post('/login', userController.loginUser);
// Get profile (protected route)
router.get('/profile', authMiddleware, userController.getUserProfile);

module.exports = router;