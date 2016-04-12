var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/markdown-wiki');
var Wiki = mongoose.model('Wiki', {
  q: String,
  markdown: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

var Topic = mongoose.model('Topic', {
  q: String,
  archives: [],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

var Utils = function() {
};

var untopicWikis = [];

function addTopic() {
  var wiki = untopicWikis.pop();
  Topic.findOne({ q: wiki.q }, function(err, topic) {
    if (!topic) {
      console.log("[Markdown wiki] New Topic: " + wiki.q);
      topic = new Topic({
        q: wiki.q
      });
    }
    topic.archives.push(wiki._id);
    topic.updated_at = new Date();
    topic.save(function(err) {
      if (untopicWikis.length === 0) {
        return;
      }
      addTopic();
    });
  });
}

// WARNING: Topic がぐちゃぐちゃになったらやるやつなので基本やってはいけない
module.exports.refresh = function(callback) {
  Topic.remove({});
  Wiki.find({}, function(err, docs) {
    untopicWikis = docs;
    addTopic();
  });
};

module.exports.allHistory = function(limit, callback) {
  Topic.find().sort({ updated_at: 'desc' }).limit(limit).exec(function(err, list) {
    if (list) {
      if (list.length > 0) {
        callback(list, "success");
        return;
      }
    }
    callback(null, "failure");
  });
};

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
        untopicWikis = [data];
        addTopic();
        callback("success");
      }
    });
  } else {
    callback("failure");
  }
};
