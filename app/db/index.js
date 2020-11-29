const mongoose = require('mongoose');
const mongodb = require('mongodb');
const config = require('../config');
const { Item } = require('./models/item');
const { Payment } = require('./models/payment');
const { User } = require('./models/user');
const { Order } = require('./models/order');
const { info } = require('winston');

const { uri } = config.db;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

function getAllMenuItems() {
  return Item.find({}).exec();
}

function getAllOrders(){
  return Order.find({}).exec();
}

function addNewPayment(info) {
  Payment.create(info);
}


function addNewUser(user) {
  User.create(user);
}

function findOneUser(candidateUsername) {
  return User.findOne({ username: candidateUsername }).exec();
}

function addNewItem(info) {
  Item.create({
    name: info.name,
    description: info.description,
    price: info.price,
    category: info.category,
    image: info.image,
    cuisine: info.cuisine,
    tags: info.tags,
    vegan: info.vegan,
    vegetarian: info.vegetarian,
    glutenFree: info.glutenFree,
    ingredients: info.ingredients,
  });
}

function addNewOrder(info) {
  Order.create({
    id: info.id,
    name: info.name,
    items: info.items,
    completed: false,
    total: info.total,
  });
}

function completeOrder(id){
  Order.updateOne({_id: new mongodb.ObjectId(id) }, { $set: {completed: true}}, (err, results) => {});
}

function deleteItem(id) {
  Item.deleteOne({ _id: new mongodb.ObjectID(id) }, (err, results) => {});
}

module.exports = { getAllMenuItems, addNewPayment, addNewUser, findOneUser, addNewItem, deleteItem };
