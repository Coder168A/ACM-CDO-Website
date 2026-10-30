// Entry point: maps each mount id in index.html to its component module.
import { Navbar } from './components/navbar.js';
import { Hero } from './components/hero.js';
import { About } from './components/about.js';
import { Events } from './components/events.js';
import { Sponsors } from './components/sponsors.js';
import { Starfield } from './components/starfield.js';
import { Officers } from './components/officers.js';
import { Contact } from './components/contact.js';
import { Footer } from './components/footer.js';

const modules = { starfield: Starfield, navbar: Navbar, hero: Hero, about: About, events: Events, sponsors: Sponsors, officers: Officers, contact: Contact, footer: Footer };

for (const [id, render] of Object.entries(modules)) {
  const el = document.getElementById(id);
  if (el) render(el);
}
