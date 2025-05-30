const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', protect, authController.getCurrentUser);

module.exports = router;
