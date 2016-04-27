import {ComponentDescriptor, VModel, createRoot, createElement, createText} from 'kivi';
import {DB} from '../data';
import {Popover} from './popover';

function entryFormatElapsed(v: number) : string {
  if (!v) return '';

  if (v > 60) {
    let minutes = Math.floor(v / 60);
    let comps = (v % 60).toFixed(2).split('.');
    let seconds = comps[0];
    let ms = comps[1];
    return minutes + ':' + seconds + '.' + ms;
  }

  return v.toFixed(2);
}

function counterClasses(count: number) : string {
  if (count >= 20) {
    return 'label label-important';
  } else if (count >= 10) {
    return 'label label-warning';
  }
  return 'label label-success';
}

function queryClasses(elapsed: number) : string {
  if (elapsed >= 10.0) {
    return 'Query elapsed warn_long';
  } else if (elapsed >= 1.0) {
    return 'Query elapsed warn';
  }
  return 'Query elapsed short';
}

const DBNameTag = new VModel('td').className('dbname');
const QueryCountTag = new VModel('td').className('query-count');

export const DatabaseView = new ComponentDescriptor<DB, any>()
  .rootTag('tr')
  .update((c) => {
    let db = c.data;
    let topFiveQueries = db.getTopFiveQueries();
    let count = db.queries.length;

    let children = [
      DBNameTag.createVNode().children(db.name),
      QueryCountTag.createVNode().children([
        createElement('span').className(counterClasses(count)).children('' + count)
      ])
    ]

    for (let i = 0; i < 5; i++) {
      let q = topFiveQueries[i];
      let elapsed = q.elapsed;

      children.push(createElement('td').className(queryClasses(elapsed)).children([
        createText(entryFormatElapsed(elapsed)),
        Popover.createVNode(q.query)
      ]))
    }

    c.sync(createRoot().children(children));
  });