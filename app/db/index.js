const mongoose = require('mongoose');
const mongodb = require('mongodb');
const config = require('../config');
const { Item } = require('./models/item');
const { Payment } = require('./models/payment');
const { User } = require('./models/user');
const { Order } = require('./models/order');
const { info } = require('winston');
//var DataTable = require('mongoose-datatable');

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

function itemFromInfo(info) {
  return {
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
  };
}

function addNewItem(info) {
  Item.create(itemFromInfo(info));
}

function addNewOrder(info) {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  Order.create({
    id: info.id,
    name: info.name,
    items: info.items,
    completed: false,
    total: info.total,
    date: mm + '/' + dd + '/' + yyyy,
  });
}

function completeOrder(id){
  console.log(id);
  Order.updateOne({_id: new mongodb.ObjectId(id) }, { $set: {completed: true}}, (err, results) => {});
}

function deleteItem(id) {
  Item.deleteOne({ _id: new mongodb.ObjectID(id) }, (err, results) => {});
}

function editItem(id, info) {
  Item.updateOne({ _id: new mongodb.ObjectID(id) },
    { $set: itemFromInfo(info) },
    (err, results) => {});
}

module.exports = { getAllMenuItems,
  addNewPayment,
  addNewUser,
  findOneUser,
  addNewItem,
  deleteItem,
  editItem,
  getAllOrders,
  addNewOrder,
  completeOrder, };
