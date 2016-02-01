goog.provide('app.ui.popover');
goog.require('kivi.CDescriptor');
goog.require('kivi.CTag');
goog.require('kivi.Component');
goog.require('kivi.VNode');

goog.scope(function() {
  var VNode = kivi.VNode;

  /** @const {!kivi.CDescriptor<string, null>} */
  app.ui.popover.d = kivi.CDescriptor.create('Popover');
  app.ui.popover.d.tag = kivi.CTag.create('div').classes('popover left');

  app.ui.popover._ContentTag = kivi.CTag.create('div').classes('popover-content');
  app.ui.popover._ArrowTag = kivi.CTag.create('div').classes('arrow');
  
  /** @param {!kivi.Component<string, null>} c */
  app.ui.popover.d.update = function(c) {
    c.syncVRoot(VNode.createRoot()
        .children([
          VNode.createElement(app.ui.popover._ContentTag).children(c.data),
          VNode.createElement(app.ui.popover._ArrowTag)
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
