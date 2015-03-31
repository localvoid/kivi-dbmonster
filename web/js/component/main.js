'use strict';

var kivi = require('kivi');
var vdom = kivi.vdom;
var Entry = require('./entry');

var _ROOT_CLASSES = ['table', 'table-striped', 'latest-data'];

function Main(context, data, children) {
  vdom.Component.call(this, context, data, children);
}
kivi.inherits(Main, vdom.Component);

Main.prototype.tag = 'table';

Main.prototype.updateView = function() {
  var dbs = this.data;

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

  this.updateRoot(root);
};

module.exports = Main;
