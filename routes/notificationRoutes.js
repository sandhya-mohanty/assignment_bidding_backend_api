const express = require('express');
const { getNotifications, markNotificationsAsRead } = require('../controllers/notificationController');
const {authenticateToken} = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, getNotifications);
router.post('/mark-read', authenticateToken, markNotificationsAsRead);

module.exports = router;








