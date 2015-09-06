goog.provide('app');
goog.require('kivi');
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

  kivi.nextFrame().write(function() {
    kivi.injectComponent(app.ui.main.d, new app.ui.main.Data(dbs, app.I), document.getElementById('app'));
  });
});
