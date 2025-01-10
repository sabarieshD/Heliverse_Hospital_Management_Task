const express = require('express');
const router = express.Router();
const loginController = require('../controllers/LoginController');

// Authenticate user
router.post('/authenticate', loginController.authenticateUser);

// Reset password request
router.post('/reset-password', loginController.resetPasswordRequest);

// Reset password using token
router.post('/reset-password/:token', loginController.resetPassword);

router.post('/registerUser', loginController.registerUser);

module.exports = router;
