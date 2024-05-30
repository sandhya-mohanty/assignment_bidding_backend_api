
const { Item } = require('../models');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });





const getAllItems = async (req, res) => {
  const { page = 1, limit = 10, search = '', status } = req.query;
  const offset = (page - 1) * limit;
  const where = {
    name: { [Op.like]: `%${search}%` }
  };
  if (status === 'active') {
    where.end_time = { [Op.gt]: new Date() };
  } else if (status === 'ended') {
    where.end_time = { [Op.lte]: new Date() };
  }
  const items = await Item.findAndCountAll({ where, limit, offset });
  res.json({
    totalItems: items.count,
    totalPages: Math.ceil(items.count / limit),
    currentPage: page,
    items: items.rows
  });
};


const getItem = async (req, res) => {
  const { id } = req.params;
  const item = await Item.findByPk(id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
};

const createItem = async (req, res) => {
  const { name, description, starting_price, end_time } = req.body;
  const image_url = req.file ? req.file.path : null;
  try {
    const item = await Item.create({ name, description, starting_price, current_price: starting_price, end_time, image_url });
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, starting_price, end_time } = req.body;
  try {
    const item = await Item.findByPk(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    if (req.user.id !== item.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    item.name = name || item.name;
    item.description = description || item.description;
    item.starting_price = starting_price || item.starting_price;
    item.end_time = end_time || item.end_time;
    if (req.file) {
      item.image_url = req.file.path;
    }
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findByPk(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    if (req.user.id !== item.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await item.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  upload
};

















