const mongoose = require('mongoose');
const config = require('../config');
const { Item } = require('./models/item');
 const { Payment } = require('./models/payment');

const { uri } = config.db;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

function getAllMenuItems() {
  return Item.find({}).exec();
}

function addNewPayment(info) {
  Payment.create({
    quantity: info.quantity,
    items: info.items,
    subtotal: info.subtotal,
    tax: info.tax,
    tip: info.tip,
    total: info.total
  })
}

module.exports = { getAllMenuItems, addNewPayment }