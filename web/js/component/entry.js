'use strict';

var kivi = require('kivi');
var vdom = kivi.vdom;

var Popover = require('./popover');

function _formatElapsed(v) {
  if (!v) return '';

  var str = parseFloat(v).toFixed(2);

  if (v > 60) {
    var minutes = Math.floor(v / 60);
    var comps = (value % 60).toFixed(2).split('.');
    var seconds = comps[0].lpad('0', 2);
    var ms = comps[1];
    str = minutes + ":" + seconds + "." + ms;
  }

  return str;
}

var _IMPORTANT_CLASS = ['label-important'];
var _WARNING_CLASS = ['label-warning'];
var _SUCCESS_CLASS = ['label-success'];

function Entry(context, data, children) {
  vdom.Component.call(this, context, data, children);
}
kivi.inherits(Entry, vdom.Component);

Entry.prototype.tag = 'tr';

Entry.prototype.updateView = function() {
  var db = this.data.db;
  var topFiveQueries = db.getTopFiveQueries();

  var name = vdom.e('td');
  name.type = 'dbname';
  name.children = [vdom.t(db.name)];

  var count = db.queries.length;

  var qcSpan = vdom.e('span');
  qcSpan.type = 'label';
  qcSpan.children = [vdom.t(count)];
  if (count >= 20) {
    qcSpan.classes = _IMPORTANT_CLASS;
  } else if (count >= 10) {
    qcSpan.classes = _WARNING_CLASS;
  } else {
    qcSpan.classes = _SUCCESS_CLASS;
  }

  var qc = vdom.e('td');
  qc.type = 'query-count';
  qc.children = [qcSpan];

  var children = [name, qc];

  for (var i = 0; i < 5; i++) {
    var q = topFiveQueries[i];
    var elapsed = q.elapsed;
    var text = vdom.t(_formatElapsed(elapsed));
    var popover = vdom.c(Popover, {query: q.query});

    var col = vdom.e('td');
    col.type = 'Query';
    var classes = [];
    classes.push('elapsed');
    if (elapsed >= 10.0) {
      classes.push('warn_long');
    } else if (elapsed >= 1.0) {
      classes.push('warn');
    } else {
      classes.push('short');
    }
    col.classes = classes;
    col.children = [text, popover];
    children.push(col);
  }

  var root = vdom.r();
  root.children = children;

  this.updateRoot(root);
};

module.exports = Entry;
