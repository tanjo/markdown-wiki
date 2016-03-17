var express = require('express');
var router = express.Router();
var mongo = require('./mongo');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.query.q) {
    mongo.search(req.query.q, function(q, markdown, result) {
      if (result === "success") {
        res.render('wiki', { title: q, markdown: markdown });
      } else {
        res.render('wiki', { title: req.query.q, markdown: null });
      }
    });
  } else {
    mongo.allHistory(50, function(history, result) {
      if (result === "success") {
        res.render('index', { title: 'ようこそ Markdown Wiki へ', history: history });
      } else {
        res.render('index', { title: 'ようこそ Markdown Wiki へ' });
      }
    });
  }
});

router.post('/', function(req, res, next) {
  if (req.body.word && req.body.markdown) {
    mongo.save(req.body.word, req.body.markdown, function(result) {
      res.redirect(303, "/?q=" + req.body.word);
    });
  } else {
    res.render('index', { title: 'ようこそ Markdown Wiki へ' });
  }
});

module.exports = router;
