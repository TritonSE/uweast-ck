const mongoose = require('mongoose');
const config = require('../config');
const { Item } = require('./models/item');

const { uri } = config.db;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

function getAllMenuItems() {
  return Item.find({}).exec();
}

module.exports = { getAllMenuItems };
