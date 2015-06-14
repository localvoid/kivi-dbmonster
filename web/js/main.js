goog.provide('app');
goog.require('kivi');
goog.require('kivi.env');
goog.require('kivi.Scheduler');
goog.require('vdom');
goog.require('app.data');
goog.require('app.ui.main');

/** @const {number} */
app.I = 0;

/** @const {number} */
app.N = 100;

document.addEventListener('DOMContentLoaded', function() {
  kivi.init(new kivi.Scheduler());

  /** @type {!Array<!app.data.Database>} */
  var dbs = [];
  for (var i = 0; i < app.N; i++) {
    dbs.push(new app.data.Database('cluster' + i));
    dbs.push(new app.data.Database('cluster' + i + 'slave'));
  }

  kivi.env.scheduler.nextFrame().write(function() {
    vdom.injectComponent(app.ui.main.d, new app.ui.main.Data(dbs, app.I), document.body);
  });
});
