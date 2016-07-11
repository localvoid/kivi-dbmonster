import {VNode, VModel, ComponentDescriptor, createVElement, injectComponent} from "kivi";
import {startFPSMonitor, startMemMonitor, initProfiler, startProfile, endProfile} from "perf-monitor";

function randomColor(): string {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function generateData(): string[][] {
  const result = new Array(100) as string[][];
  for (let i = 0; i < 100; i++) {
    const row = result[i] = new Array(100);
    for (let j = 0; j < 100; j++) {
      row[j] = randomColor();
    }
  }
  return result;
}

function updateData(data: string[][]): void {
  for (let i = 0; i < 100; i++) {
    const row = data[i];
    for (let j = 0; j < 100; j++) {
      row[j] = randomColor();
    }
  }
}

const Pixel = new VModel<string>("span")
  .className("pixel")
  .updateHandler((e, oldProps, newProps) => {
    (e as HTMLSpanElement).style.backgroundColor = newProps;
  });

const Image = new ComponentDescriptor<string[][], void>()
  .update((c, props) => {
    const children = new Array<VNode>(100);
    for (let i = 0; i < 100; i++) {
      const row = props[i];
      const rowChildren = new Array<VNode>(100);
      children[i] = createVElement("div").className("row").children(rowChildren);
      for (let j = 0; j < 100; j++) {
        rowChildren[j] = Pixel.createVNode(row[j]);
      }
    }

    c.vSync(c.createVRoot().className("image").children(children));
  });

document.addEventListener("DOMContentLoaded", () => {
  startFPSMonitor();
  startMemMonitor();
  initProfiler("data update");
  initProfiler("view update");

  const data = generateData();
  const app = injectComponent(Image, document.getElementById("app"), data, true);

  function tick() {
    startProfile("data update");
    updateData(data);
    endProfile("data update");

    startProfile("view update");
    app.update(data);
    endProfile("view update");

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
});
