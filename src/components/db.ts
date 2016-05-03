import {ComponentDescriptor, VModel, VNode, createVRoot, createVElement, createVText} from 'kivi';
import {DB} from '../data';
import {Popover} from './popover';

function entryFormatElapsed(v: number): string {
  if (!v) {
    return '';
  }

  if (v > 60) {
    let minutes = Math.floor(v / 60);
    let comps = (v % 60).toFixed(2).split('.');
    let seconds = comps[0];
    let ms = comps[1];
    return minutes + ':' + seconds + '.' + ms;
  }

  return v.toFixed(2);
}

function counterClasses(count: number): string {
  if (count >= 20) {
    return 'label label-important';
  } else if (count >= 10) {
    return 'label label-warning';
  }
  return 'label label-success';
}

function queryClasses(elapsed: number): string {
  if (elapsed >= 10.0) {
    return 'Query elapsed warn_long';
  } else if (elapsed >= 1.0) {
    return 'Query elapsed warn';
  }
  return 'Query elapsed short';
}

const DBNameElement = new VModel('td').className('dbname');
const QueryCountElement = new VModel('td').className('query-count');

export const DatabaseView = new ComponentDescriptor<DB, VNode>()
  .tagName('tr')
  .update((c) => {
    const db = c.data;
    const topFiveQueries = db.getTopFiveQueries();
    const count = db.queries.length;

    const children: VNode[] = new Array(7);
    if (c.state === null) {
      c.state = DBNameElement.createVNode().children(db.name);
    }
    children[0] = c.state;
    children[1] = QueryCountElement.createVNode().children([
      createVElement('span').className(counterClasses(count)).children('' + count),
    ]);

    for (let i = 0; i < 5; i++) {
      const q = topFiveQueries[i];
      const elapsed = q.elapsed;

      children[i + 2] = createVElement('td').className(queryClasses(elapsed)).children([
        createVText(entryFormatElapsed(elapsed)),
        Popover.createVNode(q.query),
      ]);
    }

    c.sync(createVRoot().children(children));
  });
