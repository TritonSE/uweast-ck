const express = require('express');
const db = require('../../db');

const router = express.Router();

function buildItemJSON(body) {
  body.vegan = body.vegan !== undefined;
  body.vegetarian = body.vegetarian !== undefined;
  body.glutenFree = body.glutenFree !== undefined;
  body.ingredients = body.ingredients.split(', ');
  body.price = parseFloat(body.price);

  return body;
}

// Regular get, no params or extra routing.
router.get('/', (req, res, next) => {
  const items = [];
  db.getAllMenuItems().then((allItems) => {
    for (const key in allItems) {
      const childData = allItems[key];
      items.push(childData);
    }
    res.render('admin', { items });
  }).catch((error) => {});
});

// Post data, log data to terminal.
router.post('/addItem', (req, res, next) => {
  db.addNewItem(buildItemJSON(req.body));
  res.redirect('/admin');
});

router.post('/deleteItem', (req, res, next) => {
  db.deleteItem(req.body.id);
  res.redirect('/admin');
});

router.post('/editItem', (req, res, next) => {
  db.editItem(req.body.id, buildItemJSON(req.body));
  res.redirect('/admin');
});

router.post('/featuredItem', (req, res, next) => {
  db.getAllMenuItems().then((allItems) => {
    for (const key in allItems) {
      if (req.body[allItems[key]._id]) db.setFeatured(allItems[key]._id);
      else db.setNotFeatured(allItems[key]._id);
    }
    res.redirect('/admin');
  }).catch((error) => {});
});

module.exports = router;
