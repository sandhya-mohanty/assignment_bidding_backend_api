const Notification = require('../models/notification');

const getNotificationsForUser = async (userId) => {
  try {
    const notifications = await Notification.findAll({ where: { user_id: userId } });
    return notifications;
  } catch (error) {
    throw new Error('Error fetching notifications: ' + error.message);
  }
};

const markNotificationsAsRead = async (userId) => {
  try {
    await Notification.update({ is_read: true }, { where: { user_id: userId, is_read: false } });
    return { message: 'Notifications marked as read' };
  } catch (error) {
    throw new Error('Error marking notifications as read: ' + error.message);
  }
};

module.exports = {
  getNotificationsForUser,
  markNotificationsAsRead,
};
