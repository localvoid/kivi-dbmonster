'use strict';

var INTERVAL = 0;
var DATABASE_COUNT = 100;

var kivi = require('kivi');
var Scheduler = require('kivi/lib/scheduler');

var app = require('./app');
var Store = require('./store');
var Cache = require('./cache');
var Main = require('./component/main');

document.addEventListener('DOMContentLoaded', function() {
  kivi.init(new Scheduler());

  app.store = new Store(DATABASE_COUNT);
  app.cache = new Cache();

  setInterval(function() {
    kivi.action(function() {
      app.store.update();
    });
  }, INTERVAL);

  kivi.nextFrame().write(function() {
    kivi.vdom.injectComponent(kivi.vdom.createComponent(Main), document.body);
  });
});