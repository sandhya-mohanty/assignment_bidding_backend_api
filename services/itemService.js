const Item = require('../models/item');

const getAllItems = async () => {
  try {
    const items = await Item.findAll();
    return items;
  } catch (error) {
    throw new Error('Error fetching items: ' + error.message);
  }
};

const getItemById = async (id) => {
  try {
    const item = await Item.findByPk(id);
    if (!item) {
      throw new Error('Item not found');
    }
    return item;
  } catch (error) {
    throw new Error('Error fetching item: ' + error.message);
  }
};

const createItem = async (itemData) => {
  try {
    const newItem = await Item.create(itemData);
    return newItem;
  } catch (error) {
    throw new Error('Error creating item: ' + error.message);
  }
};

const updateItem = async (id, itemData) => {
  try {
    const item = await Item.findByPk(id);
    if (!item) {
      throw new Error('Item not found');
    }
    await item.update(itemData);
    return item;
  } catch (error) {
    throw new Error('Error updating item: ' + error.message);
  }
};

const deleteItem = async (id) => {
  try {
    const item = await Item.findByPk(id);
    if (!item) {
      throw new Error('Item not found');
    }
    await item.destroy();
    return { message: 'Item deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting item: ' + error.message);
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
