import {ComponentDescriptor, VModel, createVElement} from "kivi";
import {DBList} from "../data";
import {DatabaseView} from "./db";

export const Main = new ComponentDescriptor<DBList, void>()
  .vModel(new VModel("table").className("table table-striped latest-data"))
  .update((c, props) => {
    const dbs = props.dbs;
    const rows = new Array(dbs.length);
    for (let i = 0; i < dbs.length; i++) {
      rows[i] = DatabaseView.createImmutableVNode(dbs[i]);
    }

    c.vSync(c.createVRoot().children([
      createVElement("tbody").children(rows),
    ]));
  });
