'use strict';

var I = 0;
var N = 100;

var kivi = require('kivi');
var Scheduler = require('kivi/lib/scheduler');

var data = require('./data');
var Main = require('./component/main');

function update(dbs) {
  for (var i = 0; i < dbs.length; i++) {
    dbs[i].update();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  kivi.init(new Scheduler());

  var dbs = [];
  for (var i = 0; i < N; i++) {
    dbs.push(new data.Database('cluster' + i));
    dbs.push(new data.Database('cluster' + i + 'slave'));
  }

  var main = kivi.vdom.createComponent(Main, {dbs: dbs});

  setInterval(function() {
    update(dbs);
    main.invalidate();
  }, I);

  kivi.nextFrame().write(function() {
    kivi.vdom.injectComponent(main, document.body);
  });
});
