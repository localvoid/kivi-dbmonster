'use strict';

var kivi = require('kivi');
var vdom = kivi.vdom;

var app = require('../app');
var Entry = require('./entry');

var _ROOT_CLASSES = ['table', 'table-striped', 'latest-data'];

var Main = vdom.declareComponent({
  tag: 'table',

  updateState: function() {
    var dbs = app.store.getAll();
    this.state.sub(dbs);
    this.state.data = dbs.data;
    this.state.update(true);
  },

  build: function() {
    var dbs = this.state.data;

    var rows = [];
    for (var i = 0; i < dbs.length; i++) {
      var db = dbs[i];
      rows.push(vdom.$c(db.data.id, Entry, {db: db}));
    }

    var tbody = vdom.e('tbody');
    tbody.children = rows;

    var root = vdom.r();
    root.classes = _ROOT_CLASSES;
    root.children = [tbody];

    return root;
  }
});

module.exports = Main;
