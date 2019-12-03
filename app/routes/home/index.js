const express = require('express');
// const log = require('../../logger');

const router = express.Router();

// Regular get, no params or extra routing.
router.get('/', (req, res, next) => {
  res.render('home');
});

// Post data, log data to terminal.
router.post('/', (req, res) => {
  // console.log(req.body);
  res.json({ error: null });
});

module.exports = router;
