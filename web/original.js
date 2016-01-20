goog.provide('app');
goog.require('app.data');
goog.require('app.ui.main');
goog.require('kivi.injectComponent');

/** @const {number} */
app.N = 100;

document.addEventListener('DOMContentLoaded', function() {
  var dbs = new app.data.DatabaseList(app.N);

  var c = kivi.injectComponent(app.ui.main.d, dbs, /** @type {!Element} */(document.getElementById('app')));

  function update() {
    dbs.update();
    app.ui.main.d.update(c);
    window['Monitoring']['renderRate']['ping']();
    setTimeout(update, 0);
  }
  setTimeout(update, 0);
});
