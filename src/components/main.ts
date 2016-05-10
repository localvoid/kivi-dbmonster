import {ComponentDescriptor, VModel, createVElement} from "kivi";
import {DBList} from "../data";
import {DatabaseView} from "./db";

export const Main = new ComponentDescriptor<DBList, any, any>()
  .vModel(new VModel("table").className("table table-striped latest-data"))
  .vRender((c, root) => {
    const dbs = c.props.dbs;
    const rows = new Array(dbs.length);
    for (let i = 0; i < dbs.length; i++) {
      rows[i] = DatabaseView.createVNode(dbs[i]);
    }

    root.children([
      createVElement("tbody").children(rows),
    ]);
  });
