import {ComponentDescriptor, VModel, createVElement} from 'kivi';
import {DBList} from '../data';
import {DatabaseView} from './db';

const MainRootElement = new VModel('table').className('table table-striped latest-data');

export const Main = new ComponentDescriptor<DBList, any>()
  .vModel(MainRootElement)
  .update((c) => {
    const dbs = c.data.dbs;
    const rows = new Array(dbs.length);
    for (let i = 0; i < dbs.length; i++) {
      rows[i] = DatabaseView.createVNode(dbs[i]);
    }

    c.sync(MainRootElement.createVRoot().children([
      createVElement('tbody').children(rows),
    ]));
  });
