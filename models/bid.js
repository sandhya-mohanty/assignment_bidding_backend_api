module.exports = (sequelize, DataTypes) => {
  const Bid = sequelize.define('Bid', {
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bid_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });
  return Bid;
};

