const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login',authenticateToken, login);
router.get('/profile',  getProfile);

module.exports = router;

















