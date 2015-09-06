goog.provide('app.ui.popover');
goog.require('kivi');

/**
 * @param {string} query
 * @constructor
 * @struct
 * @final
 */
app.ui.popover.Data = function(query) {
  this.query = query;
};

/** @type {!kivi.CDescriptor<!app.ui.popover.Data, null>} */
app.ui.popover.d = new kivi.CDescriptor();

/** @param {!kivi.Component<!app.ui.popover.Data, null>} c */
app.ui.popover.d.update = function(c) {
  c.syncVRoot(kivi.createRoot().classes(app.ui.popover.ROOT_CLASSES)
      .children([
        kivi.createElement('div').type('popover-content').children(c.data.query),
        kivi.createElement('div').type('arrow')
      ]));
};

/**
 * @protected
 * @const {Array<string>}
 */
app.ui.popover.ROOT_CLASSES = ['popover', 'left'];
