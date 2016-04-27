import {ComponentDescriptor, VModel} from 'kivi';

const PopoverRootTag = new VModel('div').className('popover left');
const ContentTag = new VModel('div').className('popover-content');
const ArrowTag = new VModel('div').className('arrow');

export const Popover = new ComponentDescriptor<string, any>()
  .rootVModel(PopoverRootTag)
  .update((c) => {
    c.sync(PopoverRootTag.createVRoot().children([
      ContentTag.createVNode().children(c.data),
      ArrowTag.createVNode()
    ]))
  });
