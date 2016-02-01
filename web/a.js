goog.provide('app');
goog.provide('app.ui.main');
goog.require('kivi.injectComponent');
goog.require('kivi.CDescriptor');
goog.require('kivi.Component');
goog.require('kivi.VNode');

goog.scope(function() {
  var VNode = kivi.VNode;

  /** @type {!kivi.CDescriptor<!Array, null>} */
  app.ui.main.d = kivi.CDescriptor.create('Main');
  app.ui.main.d.tag = kivi.CTag.create('table').classes('table table-striped latest-data');

  app.ui.main._DBNameTag = kivi.CTag.create('td').classes('dbname');
  app.ui.main._QueryCountTag = kivi.CTag.create('td').classes('query-count');

  app.ui.main._PopoverTag = kivi.CTag.create('div').classes('popover left');
  app.ui.main._ContentTag = kivi.CTag.create('div').classes('popover-content');
  app.ui.main._ArrowTag = kivi.CTag.create('div').classes('arrow');

  /** @param {!kivi.Component<!Array, null>} c */
  app.ui.main.d.update = function(c) {
    var dbs = c.data;

    var rows = new Array(dbs.length);
    for (var i = 0; i < dbs.length; i++) {
      var db = dbs[i];
      var row = VNode.createElement('tr');
      var topFiveQueries = db['lastSample']['topFiveQueries'];

      var children = [
        VNode.createElement(app.ui.main._DBNameTag).children(db['dbname']),
        VNode.createElement(app.ui.main._QueryCountTag).children([
          VNode.createElement('span').classes(db['lastSample']['countClassName']).children(''+db['lastSample']['nbQueries'])
        ])
      ];
      for (var j = 0; j < 5; j++) {
        var q = topFiveQueries[j];

        children.push(VNode.createElement('td').classes(q['elapsedClassName']).children([
          VNode.createText(q['formatElapsed']),
          VNode.createElement(app.ui.main._PopoverTag).children([
              VNode.createElement(app.ui.main._ContentTag).children(q['query']),
              VNode.createElement(app.ui.main._ArrowTag)
          ])
        ]));
      }

      rows[i] = row.children(children);
    }

    c.syncVRoot(VNode.createRoot()
        .classes('table table-striped latest-data')
        .children([VNode.createElement('tbody').children(rows)]));
  };
});

document.addEventListener('DOMContentLoaded', function() {
  var dbs = window['ENV']['generateData'](false)['toArray']();

  var c = kivi.injectComponent(app.ui.main.d, dbs, /** @type {!Element} */(document.getElementById('app')));

  function update() {
    dbs = window['ENV']['generateData'](false)['toArray']();
    c.data = dbs;
    app.ui.main.d.update(c);
    window['Monitoring']['renderRate']['ping']();
    setTimeout(update, window['ENV']['timeout']);
  }
  setTimeout(update, window['ENV']['timeout']);
});
