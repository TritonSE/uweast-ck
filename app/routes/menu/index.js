const express = require('express');
const db = require('../../db');
const log = require('../../logger');

const router = express.Router();

// Regular get, no params or extra routing.
router.get('/', (req, res, next) => {
  const menu_items = [];
  db.getAllMenuItems().then((allItems) => {
    console.log("All items: ", allItems);
    
    for (const key in allItems) {
      const childData = allItems[key];
      console.log("Child data: ", childData);
      
      menu_items.push(childData);
      /*menu_items.push({
        name: childData.name,
        description: childData.description,
        price: childData.price,
        category: childData.category,
        image: childData.image,
        cuisine: childData.cuisine,
        tags: childData.tags,
        vegan: childData.vegan,
        vegetarian: childData.vegetarian,
        glutenfree: childData.glutenfree,
        ingredients = childData.ingredients,
      })*/
    }
    res.render('menu', {menu_items});
  }).catch((error) => {
    log.error(error);
  });
  res.render('menu');
});

// Post data, log data to terminal.
router.post('/', (req, res) => {
  // console.log(req.body);
  res.json({ error: null });
});

module.exports = router;
