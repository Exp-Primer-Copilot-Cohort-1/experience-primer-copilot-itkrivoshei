// Create web server
// Created by: Joseph Song
// Last modified: 12/11/2013

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

// GET /comments
// Route for getting all comments
router.get('/', function(req, res) {
  Comment.find(function(err, comments) {
    if (err) {
      return res.send(500, err);
    }
    return res.send(200, comments);
  });
});

// POST /comments
// Route for creating a new comment
router.post('/', function(req, res) {
  var comment = new Comment();
  comment.author = req.body.author;
  comment.text = req.body.text;
  comment.save(function(err, comment) {
    if (err) {
      return res.send(500, err);
    }
    return res.json(comment);
  });
});

// GET /comments/:id
// Route for getting a specific comment
router.get('/:id', function(req, res) {
  Comment.findById(req.params.id, function(err, comment) {
    if (err) {
      return res.send(500, err);
    }
    return res.json(comment);
  });
});

// PUT /comments/:id
// Route for updating a specific comment
router.put('/:id', function(req, res) {
  Comment.findById(req.params.id, function(err, comment) {
    if (err) {
      return res.send(500, err);
    }
    comment.author = req.body.author;
    comment.text = req.body.text;
    comment.save(function(err, comment) {
      if (err) {
        return res.send(500, err);
      }
      return res.json(comment);
    });
  });
});

// DELETE /comments/:id
// Route for deleting a specific comment
router.delete('/:id', function(req, res) {
  Comment.remove({
    _id: req.params.id
  }, function(err) {
    if (err) {
      return res.send(500, err);
    }
    return res.send(204);
  });
});

module.exports = router;