const mongoose = require('mongoose');
const config = require('../config');
const { Item } = require('./models/item');
const { Payment } = require('./models/payment');
const { User } = require('./models/user');

var bcrypt = require('bcrypt')

const { uri } = config.db;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

function getAllMenuItems() {
  return Item.find({}).exec();
}

function getItemByCategory(cat) {
  return Item.find({ category: cat }).exec();
}

function addNewPayment(info) {
  Payment.create(info);
}

function addNewUser(user) {
  User.create(user);
}

function findOneUser(candidateUsername) {
  return User.findOne({ 'username' : candidateUsername }).exec();
}

module.exports = { getAllMenuItems, addNewPayment, addNewUser, findOneUser };
