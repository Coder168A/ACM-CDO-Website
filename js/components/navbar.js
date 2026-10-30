import { site, nav } from '../data/content.js';

export function Navbar(el) {
  el.innerHTML = `
    <nav class="nav" aria-label="Main">
      <a class="brand" href="#hero">
        <img class="logo" src="assets/acm-logo.png" width="467" height="156" alt="">
        <span class="wordmark">${site.name} ${site.chapter}<small>STUDENT CHAPTER</small></span>
      </a>
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">☰</button>
      <ul>
        ${nav.map(n => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}
        <li><a class="btn" href="#contact">Join us <img src="assets/arrow-up-right.svg" width="16" height="16" alt=""></a></li>
      </ul>
    </nav>`;
  const btn = el.querySelector('.nav-toggle');
  const list = el.querySelector('ul');
  btn.addEventListener('click', () => {
    btn.setAttribute('aria-expanded', list.classList.toggle('open'));
  });
  list.addEventListener('click', () => list.classList.remove('open'));

  // Underline the link of the section currently on screen
  const links = [...list.querySelectorAll('a:not(.btn)')];
  const spy = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.hash === `#${e.target.id}`));
    }
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(a => { const s = document.querySelector(a.hash); if (s) spy.observe(s); });
}
