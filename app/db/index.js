const mongoose = require('mongoose');
const config = require('../config');
const uri = config.db.uri;
const { Item } = require('./models/item');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

// database
db.once('open', _ => {
    console.log('Database connected:', uri);
});

db.on('error', err => {
    console.error('connection error:', err);
});