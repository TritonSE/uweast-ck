const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema( {
    id: String,
    name: String,
    items: [Object],
    completed: Boolean,
    total: Number,
    date: String,
  });
  const Order = mongoose.model('Order', orderSchema);

  module.exports = { Order};