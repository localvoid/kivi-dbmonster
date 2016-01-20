goog.provide('app.ui.popover');
goog.require('kivi.CDescriptor');
goog.require('kivi.Component');
goog.require('kivi.VNode');

goog.scope(function() {
  var VNode = kivi.VNode;

  /** @const {!kivi.CDescriptor<string, null>} */
  app.ui.popover.d = kivi.CDescriptor.create('Popover');
  
  /** @param {!kivi.Component<string, null>} c */
  app.ui.popover.d.update = function(c) {
    c.syncVRoot(VNode.createRoot().classes('popover left')
        .children([
          VNode.createElement('div').classes('popover-content').children(c.data),
          VNode.createElement('div').classes('arrow')
        ]));
  };

  /**
   * @param {string} text
   * @returns {!kivi.VNode}
   */
  app.ui.popover.createVNode = function(text) {
    return VNode.createComponent(app.ui.popover.d, text);
  };
});
