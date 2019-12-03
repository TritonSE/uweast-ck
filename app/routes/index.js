const express = require('express');

const router = express.Router();

// Default landing page
router.get('/', (req, res, next) => {
  res.render('index');
});

// app routes
router.use('/menu', require('./menu'));
router.use('/example', require('./example'));
router.use('/contact', require('./contact'));
router.use('/home', require('./home'));

module.exports = router;
