const express = require('express');
const db = require('../../db');
const router = express.Router();

// Regular get, no params or extra routing.
router.get('/', (req, res, next) => {
  res.render('items');
});

// Post data, log data to terminal.
router.post('/', (req, res) => {
  console.log(req.body.item)
  db.addNewItem(req.body.item)
  res.send(200);

});

module.exports = router;



