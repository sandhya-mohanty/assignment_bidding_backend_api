const Bid = require('../models/bid');
const Item = require('../models/item');
const Notification = require('../models/notification');

const getBidsForItem = async (itemId) => {
  try {
    const bids = await Bid.findAll({ where: { item_id: itemId } });
    return bids;
  } catch (error) {
    throw new Error('Error fetching bids: ' + error.message);
  }
};

const placeBid = async (itemId, userId, bidAmount) => {
  try {
    const item = await Item.findByPk(itemId);
    if (!item) {
      throw new Error('Item not found');
    }

    if (bidAmount <= item.current_price) {
      throw new Error('Bid amount must be higher than the current price');
    }

    const bid = await Bid.create({
      item_id: itemId,
      user_id: userId,
      bid_amount: bidAmount,
    });

    await item.update({ current_price: bidAmount });

    await Notification.create({
      user_id: item.userId,
      message: `New bid placed on your item: ${item.name}`,
      is_read: false,
    });

    return bid;
  } catch (error) {
    throw new Error('Error placing bid: ' + error.message);
  }
};

module.exports = {
  getBidsForItem,
  placeBid,
};
