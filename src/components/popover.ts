import {ComponentDescriptor, VModel, VNode} from "kivi";

const ContentElement = new VModel("div").className("popover-content");
const ArrowElement = new VModel("div").className("arrow");

export const Popover = new ComponentDescriptor<string, VNode>()
  .vModel(new VModel("div").className("popover left"))
  .vRender((c, root) => {
    if (c.state === undefined) {
      c.state = ArrowElement.createVNode();
    }
    root.children([
      ContentElement.createVNode().children(c.data),
      c.state,
    ]);
  });
