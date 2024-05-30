const bidService = require('../services/bidService');
const { validationResult } = require('express-validator');

const getBidsForItem = async (req, res) => {
  try {
    const bids = await bidService.getBidsForItem(req.params.itemId);
    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const placeBid = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { bid_amount } = req.body;
    const bid = await bidService.placeBid(req.params.itemId, req.user.id, bid_amount);
    res.status(201).json(bid);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getBidsForItem,
  placeBid,
};
























