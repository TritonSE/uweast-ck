const express = require('express');
// const log = require('../../logger');

const router = express.Router();

// Regular get, no params or extra routing.
router.get('/', (req, res, next) => {
  res.render('menu', { cart : []});
});

// Post data, log data to terminal.
router.post('/', (req, res) => {
  //console.log(req.body);

  const cart = [];
  cart.push({
    size: req.menuData.size,
    sides: req.menuData.sides,
    quantity: req.menuData.quantity,
    instructions: req.menuData.instructions,
    key: generateKey(req.menuData.size, req.menuData.sides),
  });

  //const menuData
  //render in here
  //first live weller link in here, look at line 22, the markets.push on line 28
  //instead of name address, etc, put size, sides, quantity, instructions
  
  res.render('menu', { cart });
  res.json({ error: null });
});


module.exports = router;
