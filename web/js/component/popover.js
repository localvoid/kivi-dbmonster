'use strict';

var kivi = require('kivi');
var vdom = kivi.vdom;

var _ROOT_CLASSES = ['popover', 'left'];

var Popover = vdom.declareComponent({
  build: function() {
    var content = vdom.e('div');
    content.type = 'popover-content';
    content.children = [vdom.t(this.props.query)];

    var arrow = vdom.e('div');
    arrow.type = 'arrow';

    var root = vdom.r();
    root.classes = _ROOT_CLASSES;
    root.children = [content, arrow];

    return root;
  }
});

module.exports = Popover;
