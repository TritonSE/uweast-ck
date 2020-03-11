const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  items: [Array], // how to do this to hold Item objects?
  subtotal: Number,
  tax: Number,
  tip: Number,
  total: Number,
});
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = { Payment };
