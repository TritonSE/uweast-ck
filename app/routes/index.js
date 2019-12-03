const express = require('express');

const router = express.Router();

// Default landing page
router.get('/', (req, res, next) => {
    res.render('index');
});

// app routes
router.use('/example', require('./example'));

router.use('/about', require('./about'));

router.use('/orders', require('./orders'));

module.exports = router;
