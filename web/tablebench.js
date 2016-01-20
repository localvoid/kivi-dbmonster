goog.provide('app');
goog.provide('app.Data');
goog.provide('app.ui');
goog.provide('app.ui.main');

goog.require('kivi.CDescriptor');
goog.require('kivi.Component');
goog.require('kivi.VNode');
goog.require('kivi.injectComponent');
goog.require('profiler');

/** @const {number} */
app.R = 100;
/** @const {number} */
app.C = 100;

/** @type {number} */
app.mutations = 0.03;

/** @typedef {!Array<!Array<number>>} */
app.Data;

/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
app.randInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 *
 * @param {!app.Data} data
 * @param {number} mutations
 */
app.updateData = function(data, mutations) {
  for (var i = 0; i < data.length; i++) {
    var cols = data[i];
    for (var j = 0; j < cols.length; j++) {
      if (Math.random() < mutations) {
        cols[j] = app.randInt(0, 100);
      }
    }
  }
};

goog.scope(function() {
  var VNode = kivi.VNode;

  /** @type {!kivi.CDescriptor<!app.Data, null>} */
  app.ui.main.d = kivi.CDescriptor.create('Main');
  app.ui.main.d.tag = 'table';

  /** @param {!kivi.Component<!app.Data, null>} c */
  app.ui.main.d.update = function(c) {
    var rs = c.data;

    var rows = new Array(rs.length);
    for (var i = 0; i < rs.length; i++) {
      var cs = rs[i];
      var row = VNode.createElement('tr');
      var cols = new Array(cs.length);
      for (var j = 0; j < cs.length; j++) {
        var v = cs[j];
        cols[j] = VNode.createElement('td').classes(v > 50 ? 'high' : 'low').children(v.toString());
      }

      rows[i] = row.children(cols);
    }

    c.syncVRoot(VNode.createRoot().children([VNode.createElement('tbody').children(rows)]));
  };

  document.addEventListener('DOMContentLoaded', function() {
    profiler.init('update', /** @type {!Element} */(document.getElementById('perf')));

    /** @type {!app.Data} */
    var data = [];

    // generate initial data
    for (var i = 0; i < app.R; i++) {
      var row = [];
      for (var j = 0; j < app.C; j++) {
        row.push(app.randInt(0, 100));
      }
      data.push(row);
    }

    var sliderContainer = document.createElement('div');
    sliderContainer.style.display = 'flex';
    var slider = document.createElement('input');
    slider.type = 'range';
    slider.style.width = '100%';
    slider.style.margin = '5px';
    slider.value = app.mutations * 100;
    var text = document.createElement('label');
    text.textContent = 'mutations : ' + (app.mutations * 100).toFixed(0) + '%';

    slider.addEventListener('change', function(e) {
      app.mutations = /** @type {!HTMLInputElement} */(e.target).value / 100;
      text.textContent = 'mutations : ' + (app.mutations * 100).toFixed(0) + '%';
    });
    sliderContainer.appendChild(text);
    sliderContainer.appendChild(slider);
    document.body.insertBefore(sliderContainer, document.body.firstChild);

    var c = kivi.injectComponent(app.ui.main.d, data, /** @type {!Element} */(document.getElementById('app')));

    function update() {
      app.updateData(data, app.mutations);
      profiler.measure('update', function() {
        app.ui.main.d.update(c);
      });
      requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });

});
