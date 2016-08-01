import {injectComponent} from "kivi";
import {DBList} from "./data";
import {Main} from "./components/main";
import {startFPSMonitor, startMemMonitor, initProfiler, startProfile, endProfile} from "perf-monitor";

let mutations = 0.5;
const N = 50;

document.addEventListener("DOMContentLoaded", () => {
  startFPSMonitor();
  startMemMonitor();
  initProfiler("data update");
  initProfiler("view update");

  const dbs = new DBList(N);

  const sliderContainer = document.createElement("div");
  sliderContainer.style.display = "flex";
  const slider = document.createElement("input");
  slider.type = "range";
  slider.style.marginBottom = "10px";
  slider.style.marginTop = "5px";
  const text = document.createElement("label");
  text.textContent = "mutations : " + (mutations * 100).toFixed(0) + "%";

  slider.addEventListener("change", (e) => {
    mutations = Number.parseFloat((e.target as HTMLInputElement).value) / 100;
    text.textContent = "mutations : " + (mutations * 100).toFixed(0) + "%";
  });
  sliderContainer.appendChild(text);
  sliderContainer.appendChild(slider);
  document.body.insertBefore(sliderContainer, document.body.firstChild);

  const c = injectComponent(Main, document.getElementById("app")!, dbs);

  function update() {
    startProfile("data update");
    dbs.randomUpdate(mutations);
    c.markDirty();
    endProfile("data update");

    startProfile("view update");
    c.update();
    endProfile("view update");

    setTimeout(update, 0);
    // nextFrame().write(update);
  }
  setTimeout(update, 0);
  // nextFrame().write(update);
});
