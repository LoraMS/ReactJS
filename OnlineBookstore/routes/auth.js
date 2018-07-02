var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");

router.post('/register', function(req, res) {
    if (!req.body.username || !req.body.password) {
      // res.json({success: false, msg: 'Please pass username and password.'});
      res.status(401).send({success: false, msg: 'Please pass username and password.'});
    } else {
      var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });
      // save the user
      newUser.save(function(err) {
        if (err) {
          // return res.json({success: false, msg: 'Username already exists.'});
          res.status(401).send({success: false, msg: 'Username already exists.'});
        }
        res.json({success: true, msg: 'Successful created new user.'});
      });
    }
  });

router.post('/login', function(req, res) {
    User.findOne({
      username: req.body.username
    }, function(err, user) {
      if (err) throw err;
  
      if (!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            const token = jwt.sign(user.toJSON(), settings.secret);
            
            const name = user.username;
            const email = user.email;
            const role = user.role;
            // return the information including token as JSON
            res.json({success: true, token: 'JWT ' + token, name: name, email: email, role: role, msg: 'Successful logged in user.' });
          } else {
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
    });
});

router.get('/all', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    User.find(function (err, users) {
      if (err) return next(err);
      res.json(users);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/all/:name', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    User.findOne({username: req.params.name}, function (err, user) {
      if (err) return next(err);
      console.log(user);
      res.json(user);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.delete('/all/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.put('/participate', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    User.findOne({username: req.body.name}, function (err, user) {
      if (err) { return next(err); }
      var eventId = req.body.eventId;
      var title = req.body.title;
      user.eventList.push({eventId, title});
      user.save(function (err, updated) {
        if (err) { return next(err); }
        res.send(updated);
      });
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.put('/leave', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    User.findOne({username: req.body.name}, function (err, user) {
      if (err) { return next(err); }
      var eventId = req.body.eventId;
      var eIndex = user.eventList.findIndex(e => e.eventId == eventId);
      if(eIndex !== -1){
        user.eventList.splice(eIndex, 1);
      }
      user.save(function (err, updated) {
        if (err) { return next(err); }
        res.send(updated);
      });
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.put('/add', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    User.findOne({username: req.body.name}, function (err, user) {
      if (err) { return next(err); }
      var bookId = req.body.bookId;
      var title = req.body.title;
      user.bookList.push({bookId, title});
      user.save(function (err, updated) {
        if (err) { return next(err); }
        res.send(updated);
      });
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.put('/remove', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    User.findOne({username: req.body.name}, function (err, user) {
      if (err) { return next(err); }
      var bookId = req.body.bookId;
      var bIndex = user.bookList.findIndex(b => b.bookId == bookId);
      if(bIndex !== -1){
        user.bookList.splice(bIndex, 1);
      }
      user.save(function (err, updated) {
        if (err) { return next(err); }
        res.send(updated);
      });
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

module.exports = router;