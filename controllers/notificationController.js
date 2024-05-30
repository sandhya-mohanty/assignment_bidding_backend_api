const notificationService = require('../services/notificationService');

const getNotifications = async (req, res) => {
  try {
    const notifications = await notificationService.getNotificationsForUser(req.user.id);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markNotificationsAsRead = async (req, res) => {
  try {
    const response = await notificationService.markNotificationsAsRead(req.user.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getNotifications,
  markNotificationsAsRead,
};




















