const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    _id: String,
    name: String,
    description: String,
    price: Number,
    category: String,
    image: String,
    cuisine: String,
    tags: [{
        type: String,
    }],
    vegan: Boolean,
    vegetarian: Boolean,
    glutenFree: Boolean,
    ingredients: [{
        type: String,
    }]
});
const Item = mongoose.model('menu_items', itemSchema);

module.exports = Item;