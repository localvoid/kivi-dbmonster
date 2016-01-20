goog.provide('app');
goog.require('app.data');
goog.require('app.ui.main');
goog.require('kivi.injectComponent');
goog.require('pm');

/** @type {number} */
app.mutations = 0.5;

/** @const {number} */
app.N = 50;

document.addEventListener('DOMContentLoaded', function() {
  pm.init();
  var dbs = new app.data.DatabaseList(app.N);

  var sliderContainer = document.createElement('div');
  sliderContainer.style.display = 'flex';
  var slider = document.createElement('input');
  slider.type = 'range';
  slider.style.marginBottom = '10px';
  slider.style.marginTop = '5px';
  var text = document.createElement('label');
  text.textContent = 'mutations : ' + (app.mutations * 100).toFixed(0) + '%';

  slider.addEventListener('change', function(e) {
    app.mutations = /** @type {!HTMLInputElement} */(e.target).value / 100;
    text.textContent = 'mutations : ' + (app.mutations * 100).toFixed(0) + '%';
  });
  sliderContainer.appendChild(text);
  sliderContainer.appendChild(slider);
  document.body.insertBefore(sliderContainer, document.body.firstChild);

  var c = kivi.injectComponent(app.ui.main.d, dbs, /** @type {!Element} */(document.getElementById('app')));

  function update() {
    dbs.randomUpdate(app.mutations);
    pm.measure('update', function() {
      app.ui.main.d.update(c);
    });
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
});
