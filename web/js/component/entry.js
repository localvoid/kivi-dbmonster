goog.provide('app.ui.entry');
goog.require('vdom');
goog.require('app.data');
goog.require('app.ui.popover');

/**
 * @param {!app.data.Database} db
 * @constructor
 * @struct
 * @final
 */
app.ui.entry.Data = function(db) {
  this.db = db;
};

/** @type {!vdom.CDescriptor<!app.ui.entry.Data, null>} */
app.ui.entry.d = new vdom.CDescriptor();
app.ui.entry.d.tag = 'tr';

/** @param {!vdom.Component<!app.ui.entry.Data, null>} c */
app.ui.entry.d.update = function(c) {
  var data = c.data;
  var db = data.db;

  var topFiveQueries = db.getTopFiveQueries();

  var name = vdom.createElement('td');
  name.type = 'dbname';
  name.children = [vdom.createText(db.name)];

  var count = db.queries.length;

  var qcSpan = vdom.createElement('span');
  qcSpan.type = 'label';
  qcSpan.children = [vdom.createText(count.toString())];
  if (count >= 20) {
    qcSpan.classes = app.ui.entry.IMPORTANT_CLASS;
  } else if (count >= 10) {
    qcSpan.classes = app.ui.entry.WARNING_CLASS;
  } else {
    qcSpan.classes = app.ui.entry.SUCCESS_CLASS;
  }

  var qc = vdom.createElement('td');
  qc.type = 'query-count';
  qc.children = [qcSpan];

  var children = [name, qc];

  for (var i = 0; i < 5; i++) {
    var q = topFiveQueries[i];
    var elapsed = q.elapsed;
    var text = vdom.createText(app.ui.entry.formatElapsed(elapsed));
    var popover = vdom.createComponent(app.ui.popover.d, new app.ui.popover.Data(q.query));

    var col = vdom.createElement('td');
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

  var root = vdom.createRoot();
  root.children = children;

  c.updateRoot(root);
};

/**
 * @protected
 * @param {number} v
 * @returns {string}
 */
app.ui.entry.formatElapsed = function(v) {
  if (!v) return '';

  var str = parseFloat(v).toFixed(2);

  if (v > 60) {
    var minutes = Math.floor(v / 60);
    var comps = (v % 60).toFixed(2).split('.');
    var seconds = comps[0];
    var ms = comps[1];
    str = minutes + ":" + seconds + "." + ms;
  }

  return str;
};

/**
 * @protected
 * @const {!Array<string>}
 */
app.ui.entry.IMPORTANT_CLASS = ['label-important'];

/**
 * @protected
 * @const {!Array<string>}
 */
app.ui.entry.WARNING_CLASS = ['label-warning'];

/**
 * @protected
 * @const {!Array<string>}
 */
app.ui.entry.SUCCESS_CLASS = ['label-success'];
