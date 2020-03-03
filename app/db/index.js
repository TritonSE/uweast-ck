const mongoose = require('mongoose');
const config = require('../config');
const uri = config.db.uri;
const { Item } = require('./models/item');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});

function getAllMenuItems() {
    return Item.find({}).exec();
}

module.exports = { getAllMenuItems };