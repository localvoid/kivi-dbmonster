'use strict';

var kivi = require('kivi');
var DNode = kivi.DNode;

var app = require('./app');

var DatabaseCache = function() {
  this._queries = {};
};

DatabaseCache.prototype.getTopFiveQueries = function(id) {
  var qs = this._queries[id];
  if (qs === void 0) {
    qs = DNode.create();
    this._queries[id] = qs;
  }

  if (qs.dirty) {
    var db = app.store.get(id);
    qs.sub(db);

    var queries = db.data.queries.slice();
    queries.sort(function(a, b) {
      return a.elapsed - b.elapsed;
    });
    queries = queries.slice(0, 5);
    while (queries.length < 5) {
      queries.push({
        elapsed: 0,
        query: '',
        waiting: 0
      });
    }

    qs.data = queries;
    qs.update(true);
  }

  return qs;
};

module.exports = DatabaseCache;
