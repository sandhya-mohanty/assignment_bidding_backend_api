module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
      },
      role: {
          type: DataTypes.STRING,
          defaultValue: 'user'
      },
      created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
      }
  }, {
      timestamps: false
  });

  return User;
};

