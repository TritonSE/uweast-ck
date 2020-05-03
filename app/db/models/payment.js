const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  items: [Object], // item ID
  subtotal: Number,
  tax: Number,
  total: Number,
});
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = { Payment };
