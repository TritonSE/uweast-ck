const express = require('express');
const db = require('../../db');
const User = require('../../db/models/user');
var bcrypt = require('bcrypt')

var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('menu');
});

router.post('/register', function(req, res) {
    var userData = {
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    }

    db.addNewUser(userData);
    res.status(204).send();
});

router.post('/login', function(req, res) { 
    var username = req.body.username;
    var password = req.body.password;   

    db.findOneUser(username).then((user) => {
        if (user == null) {
            res.jsonp({ message : 'userNotExist', success: false });
        }

        bcrypt.compare(password, user.password, function(err, isMatch) {
            if (isMatch) {
                res.cookie('token', username);
                res.jsonp({ success : true });
            } else { 
                res.jsonp({ message : 'incorrectPassword', success: false });
            }
        })
    });
});

// method to check token and change navbar and allow admin prvileges
router.get('/checkIfSignedIn', (req, res, next) => {
    if (req.cookies.token) res.jsonp({ signedIn: true });
    else res.jsonp({ signedIn: false });
});

router.post('/signOut', (req, res, next) => {
    res.clearCookie('token').send('logged out');
});





module.exports = router;