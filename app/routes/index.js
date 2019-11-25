const express = require('express');

const router = express.Router();

// Default landing page
router.get('/', (req, res, next) => {
    res.render('index');
});

// app routes
router.use('/menu', require('./menu'));
router.use('/example', require('./example'));

module.exports = router;
