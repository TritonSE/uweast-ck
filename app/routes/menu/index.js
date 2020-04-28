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

// Post menu request, add to cart.
router.post('/', (req, res, next) => {
  updateCart(req, res);
  res.json({ error: null });
});

router.post('/getCart', (req, res) => {
  let cart;
  try {
    cart = req.cookies.cart;
  } catch (Exception) {
    cart = [];
  }
  res.jsonp({ cart });
});

module.exports = router;
