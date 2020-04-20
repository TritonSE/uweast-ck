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
  // res.render('menu');
});

// Post menu request, add to cart.
router.post('/', (req, res) => {
  try {
    // Attempt to push new order into cart.
    const { cart } = req.cookies;
    cart.push(req.body);
    res.cookie('cart', cart);
  } catch (TypeError) {
    // If pushing fails, then cookie needs to be created with new list.
    res.cookie('cart', [req.body]);
  }
  res.json({ error: null });
});

// make new post request for getting cart, return req.cookies through res.json
// make new post request for submitting cart

module.exports = router;
