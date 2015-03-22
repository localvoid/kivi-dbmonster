'use strict';

var kivi = require('kivi');
var vdom = kivi.vdom;
var Entry = require('./entry');

var _ROOT_CLASSES = ['table', 'table-striped', 'latest-data'];

var Main = vdom.declareComponent({
  flags: vdom.Component.DISABLE_PROPS_CHECK,

  tag: 'table',

  build: function() {
    var dbs = this.props.dbs;

    var rows = [];
    for (var i = 0; i < dbs.length; i++) {
      var db = dbs[i];
      rows.push(vdom.$c(db.id, Entry, {db: db}));
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
