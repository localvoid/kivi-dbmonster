import {ComponentDescriptor, ElementDescriptor, createVElement} from "kivi";
import {DBList} from "../data";
import {DatabaseView} from "./db";

export const Main = new ComponentDescriptor<DBList, void>()
  .tagName(new ElementDescriptor("table").className("table table-striped latest-data"))
  .update((c, props) => {
    const dbs = props.dbs;
    const rows = new Array(dbs.length);
    for (let i = 0; i < dbs.length; i++) {
      rows[i] = DatabaseView.createImmutableVNode(dbs[i]);
    }

    c.sync(c.createVRoot().child(
      createVElement("tbody").children(rows),
    ));
  });
