const express = require('express');
const db = require('../../db');
const log = require('../../logger');

const router = express.Router();

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
  cart.push(req.body);
  res.cookie('cart', cart);
}

/**
 * Post request for adding menu item to cart
 */
router.post('/', (req, res, next) => {
  console.log(req.body);
  updateCart(req, res);
  res.json({ error: null });
});

/**
 * Post request for requesting the JSON of the current cart
 */
router.post('/getCart', (req, res) => {
  let cart = getCart(req);
  if (cart === undefined) cart = [];
  res.jsonp({ cart });
});

module.exports = router;
