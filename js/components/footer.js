import { site } from '../data/content.js';

export function Footer(el) {
  el.innerHTML = `
    <p>© ${new Date().getFullYear()} ${site.name} ${site.chapter} ·
      <a href="mailto:${site.email}">${site.email}</a> ·
      <a href="${site.facebook}" target="_blank" rel="noopener">Facebook</a></p>`;
}
