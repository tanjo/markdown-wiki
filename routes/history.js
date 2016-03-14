var express = require('express');
var router = express.Router();
var mongo = require('./mongo');

router.get('/', function(req, res, next) {
  if (req.query.q) {
    mongo.history(req.query.q, function(q, histories, result) {
      if (result === 'success') {
        res.render('history', {
          title: q + 'の履歴',
          q: q,
          histories: histories
        });
      } else {
        res.render('history', {
          title: req.query.q + 'の履歴',
          q: req.query.q,
          histories: null
        });
      }
    });
  } else {
    res.render('index', { title: '履歴も見れるよ'} );
  }
});

module.exports = router;
