const express = require('express');
const passport = require('passport');
const router = express.Router();
const Account = require('../models/account');

router.get('/', (req, res) => {
  res.render('index', { title: 'Gadget App', user: req.user });
});

router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

router.post('/register', (req, res) => {
  Account.findOne({ username: req.body.username }).then(user => {
    if (user) {
      return res.render('register', {
        title: 'Register',
        message: 'User already exists!',
      });
    }
    const newUser = new Account({ username: req.body.username });
    Account.register(newUser, req.body.password, (err, user) => {
      if (err || !user) {
        return res.render('register', {
          title: 'Register',
          message: 'Registration error',
        });
      }
      res.redirect('/');
    });
  });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/');
});

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

router.get('/ping', (req, res) => {
  res.status(200).send("pong!");
});

module.exports = router;
