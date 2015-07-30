goog.provide('app.ui.main');
goog.require('vdom');
goog.require('app.ui.entry');

/**
 * @param {!Array<!app.data.Database>} dbs
 * @param {number} interval
 * @constructor
 * @struct
 * @final
 */
app.ui.main.Data = function(dbs, interval) {
  this.dbs = dbs;
  this.interval = interval;
};

/** @type {!vdom.CDescriptor<!app.ui.main.Data, null>} */
app.ui.main.d = new vdom.CDescriptor();
app.ui.main.d.tag = 'table';

/** @param {!vdom.Component<!app.ui.main.Data, null>} c */
app.ui.main.d.init = function(c) {
  setInterval(function() {
    var dbs = c.data.dbs;
    for (var i = 0; i < dbs.length; i++) {
      dbs[i].update();
    }
    app.ui.main.d.update(c);
    window['Monitoring']['renderRate']['ping']();
  }, c.data.interval);
};

/** @param {!vdom.Component<!app.ui.main.Data, null>} c */
app.ui.main.d.update = function(c) {
  var dbs = c.data.dbs;

  var rows = [];
  for (var i = 0; i < dbs.length; i++) {
    var db = dbs[i];
    rows.push(vdom.createComponent(app.ui.entry.d, new app.ui.entry.Data(db)));
  }

  var tbody = vdom.createElement('tbody');
  tbody.children = rows;
  var root = vdom.createRoot();
  root.classes = app.ui.main.ROOT_CLASSES;
  root.children = [tbody];
  c.updateRoot(root);
};

/**
 * @protected
 * @const {!Array<string>}
 */
app.ui.main.ROOT_CLASSES = ['table', 'table-striped', 'latest-data'];
