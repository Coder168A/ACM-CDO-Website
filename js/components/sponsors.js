import { sponsors } from '../data/content.js';

export function Sponsors(el) {
  el.innerHTML = `
    <div class="container">
      <div class="section-label">Mission partners</div>
      <h2 class="section-title">Our Sponsors</h2>
      <div class="grid">${sponsors.map(s => `<div class="card sponsor">${s}</div>`).join('')}</div>
    </div>`;
}
