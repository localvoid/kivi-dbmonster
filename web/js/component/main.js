goog.provide('app.ui.main');
goog.require('app.ui.popover');
goog.require('kivi');

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

/** @type {!kivi.CDescriptor<!app.ui.main.Data, null>} */
app.ui.main.d = new kivi.CDescriptor('Main');
app.ui.main.d.tag = 'table';

/** @param {!kivi.Component<!app.ui.main.Data, null>} c */
app.ui.main.d.init = function(c) {
  function xx() {
    var dbs = c.data.dbs;
    for (var i = 0; i < dbs.length; i++) {
      dbs[i].update();
    }
    app.ui.main.d.update(c);
    window['Monitoring']['renderRate']['ping']();
    setTimeout(xx, 0);
  }
  xx();
};

/** @param {!kivi.Component<!app.ui.main.Data, null>} c */
app.ui.main.d.update = function(c) {
  var dbs = c.data.dbs;

  var rows = new Array(dbs.length);
  for (var i = 0; i < dbs.length; i++) {
    var db = dbs[i];
    var topFiveQueries = db.getTopFiveQueries();
    var count = db.queries.length;

    var children = [
      kivi.createElement('td').type('dbname').children(db.name),
      kivi.createElement('td').type('query-count').children([
        kivi.createElement('span').type('label').classes(app.ui.main.counterClasses(count)).children('' + count)
      ])
    ];
    for (var j = 0; j < 5; j++) {
      var q = topFiveQueries[j];
      var elapsed = q.elapsed;

      children.push(kivi.createElement('td').type('Query').classes(app.ui.main.queryClasses(elapsed)).children([
        kivi.createText(app.ui.main.entryFormatElapsed(elapsed)),
        kivi.createComponent(app.ui.popover.d, new app.ui.popover.Data(q.query))
      ]));
    }

    rows[i] = kivi.createElement('tr').children(children);
  }

  c.syncVRoot(kivi.createRoot()
      .classes(app.ui.main.ROOT_CLASSES)
      .children([kivi.createElement('tbody').children(rows)]));
};

/**
 * @protected
 * @param {number} v
 * @returns {string}
 */
app.ui.main.entryFormatElapsed = function(v) {
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
 * @param {number} count
 * @protected
 * @return {!Array<string>}
 */
app.ui.main.counterClasses = function(count) {
  if (count >= 20) {
    return app.ui.main.ENTRY_IMPORTANT_CLASS;
  } else if (count >= 10) {
    return app.ui.main.ENTRY_WARNING_CLASS;
  }
  return app.ui.main.ENTRY_SUCCESS_CLASS;
};

/**
 * @param {number} elapsed
 * @protected
 * @return {!Array<string>}
 */
app.ui.main.queryClasses = function(elapsed) {
  if (elapsed >= 10.0) {
    return app.ui.main.QUERY_CLASSES_WARN_LONG;
  } else if (elapsed >= 1.0) {
    return app.ui.main.QUERY_CLASSES_WARN;
  }
  return app.ui.main.QUERY_CLASSES_SHORT;
};

/**
 * @protected
 * @const {!Array<string>}
 */
app.ui.main.QUERY_CLASSES_WARN_LONG = ['elapsed', 'warn_long'];

/**
 * @protected
 * @const {!Array<string>}
 */
app.ui.main.QUERY_CLASSES_WARN = ['elapsed', 'warn'];

/**
 * @protected
 * @const {!Array<string>}
 */
app.ui.main.QUERY_CLASSES_SHORT = ['elapsed', 'short'];

/**
 * @protected
 * @const {!Array<string>}
 */
app.ui.main.ROOT_CLASSES = ['table', 'table-striped', 'latest-data'];

/**
 * @protected
 * @const {!Array<string>}
 */
app.ui.main.ENTRY_IMPORTANT_CLASS = ['label-important'];

/**
 * @protected
 * @const {!Array<string>}
 */
app.ui.main.ENTRY_WARNING_CLASS = ['label-warning'];

/**
 * @protected
 * @const {!Array<string>}
 */
app.ui.main.ENTRY_SUCCESS_CLASS = ['label-success'];
