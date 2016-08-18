import {ComponentDescriptor, ElementDescriptor, VNode} from "kivi";

const ContentElement = new ElementDescriptor("div").className("popover-content");
const ArrowElement = new ElementDescriptor("div").className("arrow");

export const Popover = new ComponentDescriptor<string, { arrowNode: VNode }>()
  .tagName(new ElementDescriptor("div").className("popover left"))
  .init((c) => {
    c.state = { arrowNode: ArrowElement.createVNode() };
  })
  .update((c, props, state) => {
    c.sync(c.createVRoot().children([
      ContentElement.createVNode().children(props),
      state.arrowNode,
    ]));
  });
