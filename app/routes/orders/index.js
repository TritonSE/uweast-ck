const express = require('express');
const db = require('../../db');

const router = express.Router();

// Regular get, no params or extra routing.
router.get('/', (req, res, next) => {
  const orders = [];
  db.getAllOrders().then((allOrders) => {
    for (const key in allOrders) {
      const childData = allOrders[key];
      orders.push(childData);
    }
    res.render('orders', { orders });
  }).catch((error) => {});
});


// Post data, log data to terminal.
router.post('/updateOrder', (req, res, next) => {

  db.completeOrder(req.body.name);
  res.redirect('/orders');
});

module.exports = router;
