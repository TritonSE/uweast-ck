const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema( {
    id: String,
    name: String,
    items: [Object],
    completed: Boolean,
    total: Number,
    date: Number,
  });
  const Order = mongoose.model('Order', orderSchema);

  module.exports = { Order };