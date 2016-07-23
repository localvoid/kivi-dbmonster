import {VNode, VModel, ComponentDescriptor, createVElement, injectComponent} from "kivi";
import {startFPSMonitor, startMemMonitor, initProfiler, startProfile, endProfile} from "perf-monitor";

function randomColor(): string {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function generateData(): string[] {
  const result = new Array<string>(10000);
  for (let i = 0; i < 10000; i++) {
    result[i] = randomColor();
  }
  return result;
}

function updateData(data: string[], mutations: number): void {
  if (mutations > 0) {
    if (mutations === 1) {
      for (let i = 0; i < 10000; i++) {
        data[i] = randomColor();
      }
    } else {
      for (let i = 0; i < 10000; i++) {
        if (Math.random() < mutations) {
          data[i] = randomColor();
        }
      }
    }
  }
}

const PixelElement = new VModel<string>("span")
  .className("pixel")
  .updateHandler((e, oldProps, newProps) => {
    (e as HTMLSpanElement).style.backgroundColor = newProps;
  });

const Pixel = new ComponentDescriptor<string, void>()
  .vModel(PixelElement)
  .update((c, props) => {
    c.vSync(c.createVRoot().data(props));
  });

const Image = new ComponentDescriptor<string[], void>()
  .update((c, props) => {
    const children = new Array<VNode>(100);
    for (let i = 0; i < 100; i++) {
      const offset = i * 100;
      const rowChildren = new Array<VNode>(100);
      children[i] = createVElement("div").className("row").children(rowChildren);
      for (let j = 0; j < 100; j++) {
        rowChildren[j] = Pixel.createVNode(props[offset + j]);
      }
    }

    c.vSync(c.createVRoot().className("image").children(children));
  });

document.addEventListener("DOMContentLoaded", () => {
  startFPSMonitor();
  startMemMonitor();
  initProfiler("data update");
  initProfiler("view update");

  let mutations = 0.5;

  const sliderContainer = document.createElement("div");
  sliderContainer.style.margin = "0 auto";
  sliderContainer.style.width = "80%";
  const slider = document.createElement("input");
  slider.type = "range";
  slider.style.width = "100%";

  slider.addEventListener("change", (e) => {
    mutations = Number.parseFloat((e.target as HTMLInputElement).value) / 100;
  });
  sliderContainer.appendChild(slider);
  document.body.insertBefore(sliderContainer, document.body.firstChild);

  const data = generateData();
  const app = injectComponent(Image, document.getElementById("app")!, data, true);

  function tick() {
    startProfile("data update");
    updateData(data, mutations);
    endProfile("data update");

    startProfile("view update");
    app.update(data);
    endProfile("view update");

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
});
