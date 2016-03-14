var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/markdown-wiki');
var Wiki = mongoose.model('Wiki', { q: String, markdown: String });

module.exports.search = function(q, callback) {
  if (q) {
    Wiki.find({ q : q }, function(err, data) {
      if (data.length > 0) {
        callback(data[0].q, data[0].markdown, "success");
      } else {
        callback(null, null, "failure");
      }
    });
  } else {
    callback(null, null, "failure");
  }
};

module.exports.save = function(q, markdown, callback) {
  if (q && markdown) {
    var data = new Wiki({ q: q, markdown: markdown });
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
