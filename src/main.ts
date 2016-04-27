import {injectComponent} from 'kivi';
import {DatabaseList} from './data';
import {Main} from './components/main';
import {initProfiler, measure} from './profiler';

let mutations = 0.5;
const N = 50;

document.addEventListener('DOMContentLoaded', () => {
  initProfiler('update', document.getElementById('perf'));

  const dbs = new DatabaseList(N);

  const sliderContainer = document.createElement('div');
  sliderContainer.style.display = 'flex';
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.style.marginBottom = '10px';
  slider.style.marginTop = '5px';
  const text = document.createElement('label');
  text.textContent = 'mutations : ' + (mutations * 100).toFixed(0) + '%';

  slider.addEventListener('change', (e) => {
    mutations = Number.parseFloat((e.target as HTMLInputElement).value) / 100;
    text.textContent = 'mutations : ' + (mutations * 100).toFixed(0) + '%';
  });
  sliderContainer.appendChild(text);
  sliderContainer.appendChild(slider);
  document.body.insertBefore(sliderContainer, document.body.firstChild);

  const c = injectComponent(Main, dbs, document.getElementById('app'));

  function update() {
    dbs.randomUpdate(mutations);
    measure('update', function() {
      Main._update(c);
    });
    setTimeout(update, 0);
  }
  setTimeout(update, 0);
});
