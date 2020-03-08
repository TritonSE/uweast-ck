const express = require('express');
// const log = require('../../logger');

const router = express.Router();

// Regular get, no params or extra routing.
router.get('/', (req, res, next) => {
  res.render('menu');
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

module.exports = router;
