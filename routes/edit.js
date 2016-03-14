var express = require('express');
var router = express.Router();
var mongo = require('./mongo');

router.get('/', function(req, res, next) {
  if (req.query.q) {
    mongo.search(req.query.q, function(q, markdown, result) {
      console.log(q);
      console.log(markdown);
      console.log(result);
      if (result === 'success') {
        res.render('edit', { title: q, markdown: markdown });
      } else {
        res.render('edit', { title: req.query.q, markdown: null });
      }
    });
  } else {
    res.render('index', { title: 'Markdown で Wiki を作ってみましょう'} );
  }
});

module.exports = router;
