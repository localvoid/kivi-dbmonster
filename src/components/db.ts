import {ComponentDescriptor, VModel, VNode, createVElement, createVText} from "kivi";
import {DB, EMPTY_QUERY} from "../data";
import {Popover} from "./popover";

function entryFormatElapsed(v: number): string {
  if (!v) {
    return "";
  }

  if (v > 60) {
    const minutes = Math.floor(v / 60);
    const comps = (v % 60).toFixed(2).split(".");
    const seconds = comps[0];
    const ms = comps[1];
    return minutes + ":" + seconds + "." + ms;
  }

  return v.toFixed(2);
}

function counterClasses(count: number): string {
  if (count >= 20) {
    return "label label-important";
  } else if (count >= 10) {
    return "label label-warning";
  }
  return "label label-success";
}

function queryClasses(elapsed: number): string {
  if (elapsed >= 10.0) {
    return "Query elapsed warn_long";
  } else if (elapsed >= 1.0) {
    return "Query elapsed warn";
  }
  return "Query elapsed short";
}

const DBNameElement = new VModel("td").className("dbname");
const QueryCountElement = new VModel("td").className("query-count");

export const DatabaseView = new ComponentDescriptor<DB, { nameNode: VNode }>()
  .tagName("tr")
  .createState((c, props) => ({ nameNode: DBNameElement.createVNode().children(props.name) }))
  .update((c, db, state) => {
    const topFiveQueries = db.getTopFiveQueries();
    const count = db.queries.length;

    const children: VNode[] = new Array(7);
    children[0] = state.nameNode;
    children[1] = QueryCountElement.createVNode().children([
      createVElement("span").className(counterClasses(count)).children("" + count),
    ]);

    for (let i = 0; i < 5; i++) {
      const q = topFiveQueries[i];
      const elapsed = q.elapsed;

      if (q !== EMPTY_QUERY) {
        children[i + 2] = createVElement("td").className(queryClasses(elapsed)).children([
          createVText(entryFormatElapsed(elapsed)),
          Popover.createImmutableVNode(q.query),
        ]);
      } else {
        children[i + 2] = createVElement("td").className("").children([
          createVText(""),
          Popover.createImmutableVNode(""),
        ]);
      }
    }

    c.vSync(c.createVRoot().children(children));
  });
