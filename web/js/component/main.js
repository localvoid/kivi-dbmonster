goog.provide('app.ui.main');
goog.require('app.ui.database');
goog.require('kivi');

/**
 * @protected
 * @const {!Array<string>}
 */
app.ui.main.ROOT_CLASSES = ['table', 'table-striped', 'latest-data'];

/** @type {!kivi.CDescriptor<!app.data.DatabaseList, null>} */
app.ui.main.d = new kivi.CDescriptor('Main');
app.ui.main.d.tag = 'table';

/** @param {!kivi.Component<!app.data.DatabaseList, null>} c */
app.ui.main.d.update = function(c) {
  var dbs = c.data.dbs;

  var rows = new Array(dbs.length);
  for (var i = 0; i < dbs.length; i++) {
    rows[i] = kivi.createComponent(app.ui.database.d, dbs[i]);
  }

  c.syncVRoot(kivi.createRoot()
      .classes(app.ui.main.ROOT_CLASSES)
      .children([kivi.createElement('tbody').children(rows)]));
};
