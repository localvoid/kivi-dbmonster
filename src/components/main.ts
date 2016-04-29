import {ComponentDescriptor, VModel, createVElement} from 'kivi';
import {DatabaseList} from '../data';
import {DatabaseView} from './db';

const MainRootTag = new VModel('table').className('table table-striped latest-data');

export const Main = new ComponentDescriptor<DatabaseList, any>()
  .rootVModel(MainRootTag)
  .update((c) => {
    let dbs = c.data.dbs;
    let rows = new Array(dbs.length);
    for (let i = 0; i < dbs.length; i++) {
      rows[i] = DatabaseView.createVNode(dbs[i]);
    }

    c.sync(MainRootTag.createVRoot().children([
      createVElement('tbody').children(rows)
    ]))
  });
