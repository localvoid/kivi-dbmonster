goog.provide('app.ui.database');
goog.require('app.ui.popover');
goog.require('kivi.CDescriptor');
goog.require('kivi.CTag');
goog.require('kivi.Component');
goog.require('kivi.VNode');

goog.scope(function() {
  var VNode = kivi.VNode;

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
   * @protected
   * @param {number} count
   * @returns {string}
   */
  app.ui.database.counterClasses = function(count) {
    if (count >= 20) {
      return 'label label-important';
    } else if (count >= 10) {
      return 'label label-warning';
    }
    return 'label label-success';
  };

  /**
   * @protected
   * @param {number} elapsed
   * @returns {string}
   */
  app.ui.database.queryClasses = function(elapsed) {
    if (elapsed >= 10.0) {
      return 'Query elapsed warn_long';
    } else if (elapsed >= 1.0) {
      return 'Query elapsed warn';
    }
    return 'Query elapsed short';
  };

  /** @const {!kivi.CDescriptor<!app.data.Database, null>} */
  app.ui.database.d = kivi.CDescriptor.create('Database');
  app.ui.database.d.tag = 'tr';

  app.ui.database._DBNameTag = kivi.CTag.create('td').classes('dbname');
  app.ui.database._QueryCountTag = kivi.CTag.create('td').classes('query-count');

  /** @param {!kivi.Component<!app.data.Database, null>} c */
  app.ui.database.d.update = function(c) {
    var db = c.data;
    var topFiveQueries = db.getTopFiveQueries();
    var count = db.queries.length;

    var children = [
      VNode.createElement(app.ui.database._DBNameTag).children(db.name),
      VNode.createElement(app.ui.database._QueryCountTag).children([
        VNode.createElement('span').classes(app.ui.database.counterClasses(count)).children('' + count)
      ])
    ];
    for (var i = 0; i < 5; i++) {
      var q = topFiveQueries[i];
      var elapsed = q.elapsed;

      children.push(VNode.createElement('td').classes(app.ui.database.queryClasses(elapsed)).children([
        VNode.createText(app.ui.database.entryFormatElapsed(elapsed)),
        app.ui.popover.createVNode(q.query)
      ]));
    }

    c.syncVRoot(VNode.createRoot().children(children));
  };

  /**
   * @param {!app.data.Database} db
   * @returns {!kivi.VNode}
   */
  app.ui.database.create = function(db) {
    return VNode.createComponent(app.ui.database.d, db);
  };
});
