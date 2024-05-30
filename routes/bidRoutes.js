const express = require('express');
const { getBidsForItem, placeBid } = require('../controllers/bidController');
const { authenticateToken } = require('../middlewares/authMiddleware'); // Make sure to import authenticateToken correctly

const router = express.Router();

router.get('/:itemId/bids', getBidsForItem);
router.post('/:itemId/bids', authenticateToken, // Use authenticateToken middleware here
 placeBid
);

module.exports = router;









