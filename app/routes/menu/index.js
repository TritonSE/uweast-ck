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
    console.log(req.body);
    res.status(204).send();
    /* COOKIE CODE
    
    const { cart } = req.cookies;
    cart.push(req.body);
    res.cookie('cart', cart);
    console.log(cart);
    res.status(204).send(cart);*/
  } catch (TypeError) {
    // If pushing fails, then cookie needs to be created with new list.

    /*res.cookie('cart', [req.body]);
    const { cart } = req.cookies;
    res.status(204).send(cart); */
  }
});

// make new post request for getting cart, return req.cookies through res.json
// make new post request for submitting cart

module.exports = router;
