const Sequelize = require('sequelize');
const config = require('../config/config.js');

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    dialect: 'mysql'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.js')(sequelize, Sequelize);
db.Item = require('./item.js')(sequelize, Sequelize);
db.Bid = require('./bid.js')(sequelize, Sequelize);
db.Notification = require('./notification.js')(sequelize, Sequelize);

db.User.hasMany(db.Bid, { foreignKey: 'user_id' });
db.User.hasMany(db.Notification, { foreignKey: 'user_id' });
db.Item.hasMany(db.Bid, { foreignKey: 'item_id' });
db.Bid.belongsTo(db.User, { foreignKey: 'user_id' });
db.Bid.belongsTo(db.Item, { foreignKey: 'item_id' });
db.Notification.belongsTo(db.User, { foreignKey: 'user_id' });

module.exports = db;
