const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  id: String,
  items: [Object],
  subtotal: Number,
  tax: Number,
  total: Number,
});
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = { Payment };
