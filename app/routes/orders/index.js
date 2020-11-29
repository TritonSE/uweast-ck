const express = require('express');
const db = require('../../db');

const router = express.Router();

// Regular get, no params or extra routing.
router.get('/', (req, res, next) => {
  res.render('orders');
});

// Post data, log data to terminal.
router.post('/', (req, res) => {
  db.addNewOrder(req.body.order);
  res.send(200);
  //res.json({ error: null });
});

module.exports = router;
