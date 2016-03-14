var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/markdown-wiki');
var Wiki = mongoose.model('Wiki', {
  q: String,
  markdown: String,
  created_at: Date,
  updated_at: Date
});

module.exports.history = function(q, callback) {
  if (q) {
    Wiki.find({ q: q}).sort({ updated_at: 'desc'}).exec(function(err, docs) {
      if (docs) {
        if (docs.length > 0) {
          callback(q, docs, "success");
          return;
        }
      }
      callback(null, null, "failure");
    });
  } else {
    callback(null, null, "failure");
  }
};

module.exports.search = function(q, callback) {
  if (q) {
    Wiki.find({ q : q }).sort({created_at: 'desc'}).exec(function(err, docs) {
      if (docs) {
        if (docs.length > 0) {
          callback(docs[0].q, docs[0].markdown, "success");
          return;
        }
      }
      callback(null, null, "failure");
    });
  } else {
    callback(null, null, "failure");
  }
};

module.exports.save = function(q, markdown, callback) {
  if (q && markdown) {
    var now = new Date();
    var data = new Wiki({
      q: q,
      markdown: markdown,
      created_at: now,
      updated_at: now
    });
    data.save(function(err) {
      if (err) {
        callback("failure");
      } else {
        callback("success");
      }
    });
  } else {
    callback("failure");
  }
};
