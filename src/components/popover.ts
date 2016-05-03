import {ComponentDescriptor, VModel, VNode} from 'kivi';

const PopoverRootElement = new VModel('div').className('popover left');
const ContentElement = new VModel('div').className('popover-content');
const ArrowElement = new VModel('div').className('arrow');

export const Popover = new ComponentDescriptor<string, VNode>()
  .vModel(PopoverRootElement)
  .update((c) => {
    if (c.state === null) {
      c.state = ArrowElement.createVNode();
    }
    c.sync(PopoverRootElement.createVRoot().children([
      ContentElement.createVNode().children(c.data),
      c.state,
    ]));
  });
