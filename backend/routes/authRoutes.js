const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Define the register path
router.post('/register', register);
// Define the login path
router.post('/login', login);
module.exports = router;