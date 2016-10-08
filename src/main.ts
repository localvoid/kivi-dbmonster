import {injectComponent} from "kivi";
import {DBList} from "./data";
import {Main} from "./components/main";
import {startFPSMonitor, startMemMonitor, initProfiler, startProfile, endProfile} from "perf-monitor";

function parseQueryString(a: string[]): { [key: string]: string } {
  if (a.length === 0) {
    return {};
  }
  const b = {} as { [key: string]: string };
  for (let i = 0; i < a.length; ++i) {
    const p = a[i].split("=", 2);
    if (p.length === 1) {
      b[p[0]] = "";
    } else {
      b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
  }
  return b;
}

let mutations = 0.5;
let N = 50;

const qs = parseQueryString(window.location.search.substr(1).split("&"));
if (qs["n"] !== undefined) {
  N = parseInt(qs["n"], 10);
}
if (qs["m"] !== undefined) {
  mutations = parseFloat(qs["m"]);
}

document.addEventListener("DOMContentLoaded", () => {
  startFPSMonitor();
  startMemMonitor();
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
    dbs.randomUpdate(mutations);
    c.markDirty();

    startProfile("view update");
    c.update();
    endProfile("view update");

    setTimeout(update, 0);
    // nextFrame().write(update);
  }
  setTimeout(update, 0);
  // nextFrame().write(update);
});
