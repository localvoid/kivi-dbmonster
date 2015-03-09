'use strict';

var kivi = require('kivi');
var DNode = kivi.DNode;

var _nextId = 0;

function DatabaseStore(n) {
  var dbs = [];

  for (var i = 0; i < n; i++) {
    dbs.push(DNode.create({
      id: _nextId++,
      name: 'cluster' + i,
      queries: null
    }));
    dbs.push(DNode.create({
      id: _nextId++,
      name: 'cluster' + i + 'slave',
      queries: null
    }));
  }

  this._dbs = DNode.create(dbs);
  this.update();
}

DatabaseStore.prototype.getAll = function() {
  return this._dbs;
};

DatabaseStore.prototype.get = function(id) {
  return this._dbs.data[id];
};

DatabaseStore.prototype.update = function() {
  var dbs = this._dbs.data;

  for (var i = 0; i < dbs.length; i++) {
    var db = dbs[i];

    var queries = [];

    var r = Math.floor((Math.random() * 10) + 1);
    for (var j = 0; j < r; j++) {
      var q = {
        canvas_action: null,
        canvas_context_id: null,
        canvas_controller: null,
        canvas_hostname: null,
        canvas_job_tag: null,
        canvas_pid: null,
        elapsed: Math.random() * 15,
        query: 'SELECT blah FROM something',
        waiting: Math.random() < 0.5
      };

      if (Math.random() < 0.2) {
        q.query = '<IDLE> in transaction';
      }

      if (Math.random() < 0.1) {
        q.query = 'vacuum';
      }

      queries.push(q);
    }
    db.data.queries = queries;
    db.commit();
  }
};

module.exports = DatabaseStore;