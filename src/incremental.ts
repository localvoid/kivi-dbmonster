import {scheduler, injectComponent} from "kivi";
import {ComponentDescriptor, VModel} from "kivi";
import {DBList} from "./data";
import {Main} from "./components/main";
import {startFPSMonitor} from "perf-monitor";

const mutations = 1;
const N = 100;

class DragMeState {
  drag: boolean;
  left: number;
  top: number;
  startLeft: number;
  startTop: number;

  constructor() {
    this.drag = false;
    this.left = 0;
    this.top = 0;
    this.startLeft = 0;
    this.startTop = 0;
  }
}

const DragMe = new ComponentDescriptor<void, DragMeState>()
  .vModel(new VModel("div").className("DragMe"))
  .createState((c) => new DragMeState())
  .attached((c) => {
    (c.element as HTMLElement).onmousedown = (e) => {
      if (!c.state.drag) {
        c.state.drag = true;
        c.state.startLeft = e.pageX - (e.currentTarget as HTMLElement).offsetLeft;
        c.state.startTop = e.pageY - (e.currentTarget as HTMLElement).offsetTop;
        c.startInteraction();
      }
    };
    window.onmousemove = (e) => {
      if (c.state.drag) {
        c.state.left = e.pageX - c.state.startLeft;
        c.state.top = e.pageY - c.state.startTop;
        c.invalidate();
      }
    };
    window.onmouseup = () => {
      if (c.state.drag) {
        c.state.drag = false;
        c.finishInteraction();
      }
    };
  })
  .update((c, props, state) => {
    c.vSync(c.createVRoot().style(`left:${state.left}px;top:${state.top}px`).children("DragMe"));
  });


document.addEventListener("DOMContentLoaded", () => {
  startFPSMonitor();

  const dbs = new DBList(N);
  const c = injectComponent(Main, document.getElementById("app"), dbs);
  injectComponent(DragMe, document.body);

  function update() {
    dbs.randomUpdate(mutations);
    c.markDirty();
    c.update();
    scheduler.nextFrame().write(update);
  }
  scheduler.nextFrame().write(update);
});
