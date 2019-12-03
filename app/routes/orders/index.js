const express = require('express');

const router = express.Router();

// Regular get, no params or extra routing.
router.get('/', (req, res, next) => {
  res.render('orders');
});

// Post data, log data to terminal.
router.post('/', (req, res) => {
  res.json({ error: null });
});

module.exports = router;
