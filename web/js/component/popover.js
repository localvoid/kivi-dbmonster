goog.provide('app.ui.popover');
goog.require('kivi');

/**
 * @protected
 * @const {!Array<string>}
 */
app.ui.popover.ROOT_CLASSES = ['popover', 'left'];

/** @type {!kivi.CDescriptor<string, null>} */
app.ui.popover.d = new kivi.CDescriptor('Popover');

/** @param {!kivi.Component<string, null>} c */
app.ui.popover.d.update = function(c) {
  c.syncVRoot(kivi.createRoot().classes(app.ui.popover.ROOT_CLASSES)
      .children([
        kivi.createElement('div').type('popover-content').children(c.data),
        kivi.createElement('div').type('arrow')
      ]));
};
