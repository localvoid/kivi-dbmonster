'use strict';

var kivi = require('kivi');
var vdom = kivi.vdom;

var _ROOT_CLASSES = ['popover', 'left'];

function Popover(context, data, children) {
  vdom.Component.call(this, context, data, children);
}
kivi.inherits(Popover, vdom.Component);

Popover.prototype.updateView = function() {
  var content = vdom.e('div');
  content.type = 'popover-content';
  content.children = [vdom.t(this.data.query)];

  var arrow = vdom.e('div');
  arrow.type = 'arrow';

  var root = vdom.r();
  root.classes = _ROOT_CLASSES;
  root.children = [content, arrow];

  this.updateRoot(root);
};

module.exports = Popover;
