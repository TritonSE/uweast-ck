const mongoose = require('mongoose');
const { Item } = require('item');

const paymentSchema = new mongoose.Schema({
  quantity: Number,
  items: [Item],    // payment ID, orders database, hash something possible?
    /*name: String,
    size: String,
    special: String,
    */
  //}, // how to do this to hold Item objects?
  //size...
  subtotal: Number,
  tax: Number,
  tip: Number,
  total: Number,
});
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = { Payment };
