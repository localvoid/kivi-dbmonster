goog.provide('app.ui.database');
goog.require('app.ui.popover');
goog.require('kivi');

/**
 * @protected
 * @const {!Array<string>}
 */
app.ui.database.QUERY_CLASSES_WARN_LONG = ['elapsed', 'warn_long'];

/**
 * @protected
 * @const {!Array<string>}
 */
app.ui.database.QUERY_CLASSES_WARN = ['elapsed', 'warn'];

/**
 * @protected
 * @const {!Array<string>}
 */
app.ui.database.QUERY_CLASSES_SHORT = ['elapsed', 'short'];

/**
 * @protected
 * @const {!Array<string>}
 */
app.ui.database.ENTRY_IMPORTANT_CLASS = ['label-important'];

/**
 * @protected
 * @const {!Array<string>}
 */
app.ui.database.ENTRY_WARNING_CLASS = ['label-warning'];

/**
 * @protected
 * @const {!Array<string>}
 */
app.ui.database.ENTRY_SUCCESS_CLASS = ['label-success'];

/** @const {!kivi.CDescriptor<!app.data.Database, null>} */
app.ui.database.d = new kivi.CDescriptor('Database');
app.ui.database.d.tag = 'tr';

/** @param {!kivi.Component<!app.data.Database, null>} c */
app.ui.database.d.update = function(c) {
  var db = c.data;
  var topFiveQueries = db.getTopFiveQueries();
  var count = db.queries.length;

  var children = [
    kivi.createElement('td').type('dbname').children(db.name),
    kivi.createElement('td').type('query-count').children([
      kivi.createElement('span').type('label').classes(app.ui.database.counterClasses(count)).children('' + count)
    ])
  ];
  for (var i = 0; i < 5; i++) {
    var q = topFiveQueries[i];
    var elapsed = q.elapsed;

    children.push(kivi.createElement('td').type('Query').classes(app.ui.database.queryClasses(elapsed)).children([
      kivi.createText(app.ui.database.entryFormatElapsed(elapsed)),
      kivi.createComponent(app.ui.popover.d, q.query)
    ]));
  }

  c.syncVRoot(kivi.createRoot().disableChildrenShapeError().children(children));
};

/**
 * @protected
 * @param {number} v
 * @returns {string}
 */
app.ui.database.entryFormatElapsed = function(v) {
  if (!v) return '';

  var str = parseFloat(v).toFixed(2);

  if (v > 60) {
    var minutes = Math.floor(v / 60);
    var comps = (v % 60).toFixed(2).split('.');
    var seconds = comps[0];
    var ms = comps[1];
    str = minutes + ':' + seconds + '.' + ms;
  }

  return str;
};

/**
 * @param {number} count
 * @protected
 * @return {!Array<string>}
 */
app.ui.database.counterClasses = function(count) {
  if (count >= 20) {
    return app.ui.database.ENTRY_IMPORTANT_CLASS;
  } else if (count >= 10) {
    return app.ui.database.ENTRY_WARNING_CLASS;
  }
  return app.ui.database.ENTRY_SUCCESS_CLASS;
};

/**
 * @param {number} elapsed
 * @protected
 * @return {!Array<string>}
 */
app.ui.database.queryClasses = function(elapsed) {
  if (elapsed >= 10.0) {
    return app.ui.database.QUERY_CLASSES_WARN_LONG;
  } else if (elapsed >= 1.0) {
    return app.ui.database.QUERY_CLASSES_WARN;
  }
  return app.ui.database.QUERY_CLASSES_SHORT;
};
