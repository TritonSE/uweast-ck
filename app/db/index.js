const mongoose = require('mongoose');
const config = require('../config');
const { Item } = require('./models/item');
// const { Payment } = require('./models/payment');

const { uri } = config.db;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

function getAllMenuItems() {
  return Item.find({}).exec();
}


function getItemByCategory(cat) {
  return Item.find({ category: cat }).exec();
}

function getItemByName(nm) {
  return Item.find({ name: nm }).exec();
}

function getItemByPrice(pr) {
  return Item.find({ price: pr }).exec();
}

function getItemByTag(tg) {
  return Item.find({ tags: tg }).exec();
}

module.exports = { getAllMenuItems, getItemByCategory, getItemByName, getItemByPrice, getItemByTag };
