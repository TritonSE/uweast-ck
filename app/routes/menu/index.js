const express = require('express');
// const log = require('../../logger');
const db = require('../../db');
const log = require('../../logger');

const router = express.Router();

// Regular get, no params or extra routing.
router.get('/', (req, res, next) => {
  res.render('menu');
});

// Post data, log data to terminal.
router.post('/', (req, res) => {
  // console.log(req.body);
  const items = [];
  db.getAllMenuItems().then((allItems) => {
    for (const key in allItems) {
      const childData = allItems[key];
      items.push({
        name: childData.name,
        description: childData.description,
        price: childData.price,
        category: childData.category,
        image: childData.image,
        cuisine: childData.cuisine,
        tags: childData.tags,
        vegan: childData.vegan,
        vegetarian: childData.vegetarian,
        glutenFree: childData.glutenFree,
        ingredients: childData.ingredients,
      });
      items.push(childData);
    }
    res.render('menu', { items });
  }).catch((error) => {
    console.log(req.body);
    log.error(error);
  });
  // res.render('menu');
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
  const cart = getCart(req);
  cart.push(req.body);
  res.cookie('cart', cart);
}

// Post menu request, add to cart.
router.post('/', (req, res, next) => {
  updateCart(req, res);
  router.get('/', (req, res, next));
  res.json({ error: null });
});

module.exports = router;
