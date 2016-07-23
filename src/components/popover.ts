import {ComponentDescriptor, VModel, VNode} from "kivi";

const ContentElement = new VModel("div").className("popover-content");
const ArrowElement = new VModel("div").className("arrow");

export const Popover = new ComponentDescriptor<string, { arrowNode: VNode }>()
  .vModel(new VModel("div").className("popover left"))
  .createState((c) => ({ arrowNode: ArrowElement.createVNode() }))
  .update((c, props, state) => {
    c.vSync(c.createVRoot().children([
      ContentElement.createVNode().children(props),
      state.arrowNode,
    ]));
  });
