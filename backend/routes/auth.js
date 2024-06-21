const express = require('express');
const router = express.Router();
const { registerUser, loginUser, protectedRoute } = require('../controllers/auth');
const { verifyToken } = require('../middlewares/auth');

// Define your routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/protected', verifyToken, protectedRoute);

module.exports = router;
