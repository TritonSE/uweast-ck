const express = require('express');
const db = require('../../db');

const router = express.Router();

// Regular get, no params or extra routing.
router.get('/', (req, res, next) => {
    res.render('admin');
});

// Post data, log data to terminal.
router.post('/addItem', (req, res, next) => {
    db.addNewItem(buildItemJSON(req.body));
    res.render('admin');
});

function buildItemJSON(body) {
    body['vegan'] = (body['vegan'] === undefined) ? false : true;
    body['vegetarian'] = (body['vegetarian'] === undefined) ? false : true;
    body['glutenFree'] = (body['glutenFree'] === undefined) ? false : true;
    body['ingredients'] = body['ingredients'].split(",");
    body['price'] = parseFloat(body['price']);

    return body;
}

module.exports = router;