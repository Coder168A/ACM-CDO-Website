import { officers } from '../data/content.js';

const initials = name => name.split(' ').map(w => w[0]).slice(0, 2).join('');

export function Officers(el) {
  el.innerHTML = `
    <div class="container">
      <div class="section-label">The crew</div>
      <h2 class="section-title">Meet the Team</h2>
      <div class="grid">${officers.map(o => `
        <article class="card officer">
          <div class="avatar" aria-hidden="true">${initials(o.name)}</div>
          <h3>${o.name}</h3><p>${o.role}</p>
        </article>`).join('')}</div>
    </div>`;
}
