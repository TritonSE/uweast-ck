const express = require('express');
// const log = require('../../logger');

const router = express.Router();

// Regular get, no params or extra routing.
router.get('/', (req, res, next) => {
  res.render('menu');
});

// Get menu data
/*router.get('/', (req, res) => {
  console.log('load collection')
  const db = req.db;
  const collection = db.get('menu_items');
  collection.find({},{},function(e, docs) {
    console.log('find collection');
  });
});*/

// Post data, log data to terminal.
router.post('/', (req, res) => {
  // console.log(req.body);
  res.json({ error: null });
});

module.exports = router;
