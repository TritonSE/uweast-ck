const express = require('express');
const db = require('../../db');
const log = require('../../logger');

const router = express.Router();

class Info {
  constructor(items, subtotal, tax, total) {
    this.items = items;
    this.subtotal = subtotal;
    this.tax = tax;
    this.total = total;
  }
}

// Regular get, no params or extra routing.
router.get('/', (req, res, next) => {
  const items = [];
  db.getAllMenuItems().then((allItems) => {
    for (const key in allItems) {
      const childData = allItems[key];
      items.push(childData);
    }
    res.render('menu', { items });
  }).catch((error) => {
    log.error(error);
  });
});

function getCart(req) {
  try {
    const { cart } = req.cookies;
    return cart;
  } catch (TypeError) {
    return [];
  }
}

function updateCart(req, res) {
  let cart = getCart(req);
  if (cart === undefined) cart = [];
  cart.push(req.body.item);
  res.cookie('cart', cart);
}

function removeCartItem(req, res) {
  const cart = getCart(req);
  /* Make sure to implement check for null cart
      in remove call from menu.js */
  const index = parseInt(req.body.index, 10);
  cart.splice(index, 1);
  res.cookie('cart', cart);
}

/**
 * Post request for adding menu item to cart
 */
router.post('/addCart', (req, res) => {
  updateCart(req, res);
  // res.jsonp({ error: null });
  res.status(204).send();
});

/**
 * Post request for removing menu item from cart
 */
router.post('/removeCart', (req, res) => {
  removeCartItem(req, res);
  res.status(204).send();
});

/**
 * Post request for requesting the JSON of the current cart
 */
router.post('/getCart', (req, res) => {
  let cart = getCart(req);
  if (cart === undefined) cart = [];
  res.jsonp({ cart });
});

/**
 * Post request for adding order to database
 * Ideally, this would happen in the index.js for the cart route, but the functionality is set up
 */
router.post('/submitOrder', (req, res) => {
  let cart = getCart(req);
  //const info = new Info(body.items.cart, body.subtotal, body.tax, body.total);
  //db.addNewPayment(info);
  //handleRequest(req, res);
  res.status(204).send();
});

module.exports = router;
