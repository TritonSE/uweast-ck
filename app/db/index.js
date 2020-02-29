const mongoose = require('mongoose');
const config = require('../config');
const { Item } = require('./models/item');

mongoose.connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

// database
db.once('open', _ => {
    console.log('Database connected:', url);
});

db.on('error', err => {
    console.error('connection error:', err);
});