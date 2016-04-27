const MAX_SAMPLES = 200;

const instances: any = {};

/**
 * Profiler Widget
 */
class Widget {
  name: string;
  samples: number[];
  element: HTMLDivElement;
  label: HTMLDivElement;
  text: HTMLDivElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(name: string) {
    this.name = name;
    this.samples = [];

    this.element = document.createElement('div');
    this.element.style.cssText = 'padding: 2px; background-color: #020';
    this.label = document.createElement('div');
    this.label.style.cssText = 'text-align: center; font-size: 12px; color: #0f0';
    this.label.textContent = this.name;
    this.text = document.createElement('div');
    this.text.style.cssText = 'font-size: 12px; color: #0f0';
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = 'display: block; padding: 0; margin: 0';
    this.canvas.width = Widget.WIDTH;
    this.canvas.height = Widget.HEIGHT;

    this.element.appendChild(this.label);
    this.element.appendChild(this.text);
    this.element.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
  }

  static HEIGHT = 100;
  static WIDTH = MAX_SAMPLES;

  update() : void {
    const min = Math.min.apply(Math, this.samples);
    const max = Math.max.apply(Math, this.samples);
    const now = this.samples[this.samples.length - 1];
    const scale = Widget.HEIGHT / max;

    this.text.innerHTML = `<div>min: ${min.toFixed(3)}ms</div><div>max: ${max.toFixed(3)}ms</div><div>now: ${now.toFixed(3)}ms</div>`;

    this.ctx.fillStyle = '#010';
    this.ctx.fillRect(0, 0, Widget.WIDTH, Widget.HEIGHT);

    this.ctx.fillStyle = '#0f0';
    for (let i = 0; i < this.samples.length; i++) {
      this.ctx.fillRect(i, Widget.HEIGHT, 1, -(this.samples[i] * scale));
    }
  }
}

/**
 * Initialize profiler and insert into container
 */
export function initProfiler(name: string, container: Element) : void {
  const w = new Widget(name);
  instances[name] = w;
  container.appendChild(w.element);
}

/**
 * Measure time
 */
export function measure(name: string, fn: Function) : void {
  const w = instances[name];
  const t = window.performance.now();
  fn();
  w.samples.push(window.performance.now() - t);
  if (w.samples.length > MAX_SAMPLES) {
    w.samples.shift();
  }
  w.update();
}
