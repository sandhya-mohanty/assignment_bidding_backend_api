module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      description: {
          type: DataTypes.TEXT,
          allowNull: false
      },
      starting_price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false
      },
      current_price: {
          type: DataTypes.DECIMAL(10, 2),
          defaultValue: 0
      },
      image_url: {
          type: DataTypes.STRING,
          allowNull: true
      },
      end_time: {
          type: DataTypes.DATE,
          allowNull: false
      },
      created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
      }
  }, {
  
      timestamps: false
  });

  return Item;
};

