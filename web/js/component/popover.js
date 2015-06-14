goog.provide('app.ui.popover');
goog.require('vdom');

/**
 * @param {string} query
 * @constructor
 * @struct
 * @final
 */
app.ui.popover.Data = function(query) {
  this.query = query;
};

/** @type {!vdom.CDescriptor<!app.ui.popover.Data, null>} */
app.ui.popover.d = new vdom.CDescriptor();

/** @param {!vdom.Component<!app.ui.popover.Data, null>} c */
app.ui.popover.d.update = function(c) {
  var content = vdom.createElement('div');
  content.type = 'popover-content';
  content.children = [vdom.createText(c.data.query)];

  var arrow = vdom.createElement('div');
  arrow.type = 'arrow';

  var root = vdom.createRoot();
  root.classes = app.ui.popover.ROOT_CLASSES;
  root.children = [content, arrow];

  c.updateRoot(root);
};

/**
 * @protected
 * @const {Array<string>}
 */
app.ui.popover.ROOT_CLASSES = ['popover', 'left'];
