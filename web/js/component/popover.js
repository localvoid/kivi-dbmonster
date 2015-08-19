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
  c.updateRoot(vdom.createRoot().classes(app.ui.popover.ROOT_CLASSES)
      .children([
        vdom.createElement('div').type('popover-content').children(c.data.query),
        vdom.createElement('div').type('arrow')
      ]));
};

/**
 * @protected
 * @const {Array<string>}
 */
app.ui.popover.ROOT_CLASSES = ['popover', 'left'];
