import { site } from '../data/content.js';

export function Contact(el) {
  el.innerHTML = `
    <div class="container">
      <div class="section-label">Open a channel</div>
      <h2 class="section-title">Get in Touch</h2>
      <p class="lead">Want to join or partner with us? Send a message.</p>
      <form class="contact-form">
        <label>Name <input name="name" required></label>
        <label>Email <input name="email" type="email" required></label>
        <label>Message <textarea name="message" rows="4" required></textarea></label>
        <button class="btn" type="submit">Send transmission <img src="assets/arrow-up-right.svg" width="16" height="16" alt=""></button>
        <p class="form-status" role="status"></p>
      </form>
    </div>`;
  // shortcut: opens the user's mail app; swap for a backend/Formspree when one exists
  el.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const body = encodeURIComponent(`${f.get('message')}\n\n— ${f.get('name')} (${f.get('email')})`);
    location.href = `mailto:${site.email}?subject=ACM%20USTP%20Inquiry&body=${body}`;
    el.querySelector('.form-status').textContent = 'Opening your email app…';
  });
}
