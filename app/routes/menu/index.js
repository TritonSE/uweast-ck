const express = require('express');
const db = require('../../db');
const log = require('../../logger');

const router = express.Router();

// Regular get, no params or extra routing.
router.get('/', (req, res, next) => {
  const items = [];
  db.getAllMenuItems().then((allItems) => {
    console.log("All items: ", allItems.length);
    
    for (const key in allItems) {
      const childData = allItems[key];
      items.push(childData);
    }
    console.log(items);
    res.render('menu', {items});
  }).catch((error) => {
    log.error(error);
  });
  
  //res.render('menu');
});

// Post data, log data to terminal.
router.post('/', (req, res) => {
  // console.log(req.body);
  res.json({ error: null });
});

module.exports = router;
