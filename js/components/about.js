import { pillars } from '../data/content.js';
import { Card } from './card.js';

export function About(el) {
  el.innerHTML = `
    <div class="container">
      <div class="section-label">Who we are</div>
      <h2 class="section-title">About Us</h2>
      <p class="lead">ACM USTP brings together students passionate about computing to grow skills and lead in tech.</p>
      <p class="lead">Placeholder: a second paragraph on the chapter's mission, history, and what members get out of joining.</p>
      <div class="grid">${pillars.map(p => Card({ top: `<div class="icon">${p.icon}</div>`, ...p })).join('')}</div>
    </div>`;
}
