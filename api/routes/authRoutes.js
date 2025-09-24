const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);

// Protected route example
router.get('/profile', verifyToken, (req, res) => {
  res.json({
    status: 'success',
    message: 'Profile data retrieved successfully',
    data: {
      user: req.user
    }
  });
});

module.exports = router;