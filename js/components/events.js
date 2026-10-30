import { events } from '../data/content.js';
import { Card } from './card.js';

export function Events(el) {
  el.innerHTML = `
    <div class="container">
      <div class="section-label">Mission log</div>
      <h2 class="section-title">Upcoming Events</h2>
      <div class="grid">${events.map(e => Card({ top: `<div class="date">${e.date}</div>`, ...e })).join('')}</div>
    </div>`;
}
