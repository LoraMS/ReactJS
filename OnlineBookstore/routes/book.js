var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = require('../models/Book.js');

var passport = require('passport');
require('../config/passport')(passport);

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

/* Get All Books */
router.get('/', function(req, res, next) {
    Book.find(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
  });


  /* Get Books By Category */
router.get('/category/:name', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
  Book.find({category:req.params.name} , req.body, function(err, products) {
    if (err)return next(err);
    res.json(products);
  });
} else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

/* Get Single Book by Id */
router.get('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    Book.findById(req.params.id, function (err, books) {
      if (err) return next(err);
      res.json(books);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

/* Save Book */
router.post('/', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    Book.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

/* Update Book */
router.put('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    Book.findByIdAndUpdate(req.params.id,req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

/* Delete Book */
router.delete('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    Book.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

/* Add comment */
router.put('/:id/comments', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    Book.findById(req.params.id, function (err, book) {
      if (err) { return next(err); }
      if (!book) { return res.send(404); }
      var author = req.body.author;
      var content = req.body.content;
      book.reviews.push({author, content});
      book.save(function (err, updated) {
        if (err) { return next(err); }
        res.send(updated);
      });
      // book.reviews = book.reviews || [];
      // book.reviews.push(req.body);
      // console.log(req.body)// { author: 'user', content: 'hello' }
      // res.json(book);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

module.exports = router;