// routes/itemRoutes.js
const express = require('express');
const { getAllItems, getItem, createItem, updateItem, deleteItem, upload } = require('../controllers/itemController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');
const router = express.Router();

router.get('/', getAllItems);
router.get('/:id', getItem);
router.post('/', authenticateToken, upload.single('image'), createItem);
router.put('/:id', authenticateToken, authorize(['admin', 'user']), upload.single('image'), updateItem);
router.delete('/:id', authenticateToken, authorize(['admin', 'user']), deleteItem);

module.exports = router;


