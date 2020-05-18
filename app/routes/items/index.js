const express = require('express');
const db = require('../../db');
const router = express.Router();


class Item {
  constructor(id, name, description, price, category, image, cuisine, vegan, vegetarian, glutenFree, ingredients) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.category = category;
      this.image = image;
      this.cuisine = cuisine;
      this.vegan = vegan;
      this.vegetarian = vegetarian;
      this.glutenFree = glutenFree
      this.ingredients = ingredients;
  }
}

// Regular get, no params or extra routing.
router.get('/', (req, res, next) => {
  res.render('items');
});



// Post data, log data to terminal.
router.post('/', (req, res) => {
  id = req.body.item.id;
  name = req.body.item.name;
  description = req.body.item.description;
  price = req.body.item.price;
  category = req.body.item.category;
  image = req.body.item.image;
  cuisine = req.body.item.cuisine;


  console.log(req.body.item)
  db.addNewItem(req.body.item)
  res.send(200);

});

module.exports = router;



