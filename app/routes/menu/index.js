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
  // res.render('menu');
});

function getCart(req) {
  const { cart } = req.cookies;
  if (cart == undefined){
    return []
  }
  else{
    return cart;
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
