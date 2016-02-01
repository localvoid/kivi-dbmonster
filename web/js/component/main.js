goog.provide('app.ui.main');
goog.require('app.ui.database');
goog.require('kivi.CDescriptor');
goog.require('kivi.CTag');
goog.require('kivi.Component');
goog.require('kivi.VNode');

goog.scope(function() {
  var VNode = kivi.VNode;

  /** @type {!kivi.CDescriptor<!app.data.DatabaseList, null>} */
  app.ui.main.d = kivi.CDescriptor.create('Main');
  app.ui.main.d.tag = kivi.CTag.create('table').classes('table table-striped latest-data');

  /** @param {!kivi.Component<!app.data.DatabaseList, null>} c */
  app.ui.main.d.update = function(c) {
    var dbs = c.data.dbs;

    var rows = new Array(dbs.length);
    for (var i = 0; i < dbs.length; i++) {
      rows[i] = app.ui.database.create(dbs[i]);
    }

    c.syncVRoot(VNode.createRoot()
        .children([VNode.createElement('tbody').children(rows)]));
  };
});
