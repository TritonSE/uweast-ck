const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  cuisine: String,
  tags: [String],
  vegan: Boolean,
  vegetarian: Boolean,
  glutenFree: Boolean,
  ingredients: [String],
});
const Item = mongoose.model('Item', itemSchema);

module.exports = { Item };
