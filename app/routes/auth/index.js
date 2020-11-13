const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../../db');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('menu');
});

router.post('/register', (req, res) => {
  const userData = {
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  db.addNewUser(userData);
  res.status(204).send();
});

router.post('/login', (req, res) => {
  const { username } = req.body;
  const { password } = req.body;

  db.findOneUser(username).then((user) => {
    if (user == null) {
      res.jsonp({ message: 'userNotExist', success: false });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (isMatch) {
        res.cookie('token', username);
        res.jsonp({ success: true });
      } else {
        res.jsonp({ message: 'incorrectPassword', success: false });
      }
    });
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
