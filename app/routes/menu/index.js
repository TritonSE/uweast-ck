const express = require('express');
const db = require('../../db');
const log = require('../../logger');

const router = express.Router();

// Regular get, no params or extra routing.
router.get('/', (req, res, next) => {
  const items = [];
  const cart = [];
  db.getAllMenuItems().then((allItems) => {
    for (const key in allItems) {
      const childData = allItems[key];
      items.push(childData);
    }
    res.render('menu',{ items, cart });
  }).catch((error) => {
    log.error(error);
  });
});

// Post menu request, add to cart.
router.post('/', (req, res) => {
  //console.log(req.body);

  //const menuData
  //render in here
  //first live weller link in here, look at line 22, the markets.push on line 28
  //instead of name address, etc, put size, sides, quantity, instructions
  
 
  try {
    // Attempt to push new order into cart.
    const { cart } = req.cookies;
    cart.push(req.body);
    res.cookie('cart', cart);
  } catch (TypeError) {
    // If pushing fails, then cookie needs to be created with new list.
    res.cookie('cart', [req.body]);
  }
  res.render('menu', { cart });
  res.json({ error: null });
});


module.exports = router;
