import { site, planets } from '../data/content.js';
import { Glitch } from './glitch.js';

// Orbit the planet markers follow: a loop around the accretion disk in the video's own 1280x720 frame (traced from MY VISION screenshot).
const DISK = [[297,377],[444,373],[609,317],[662,294],[707,208],[752,168],[903,140],[1008,159],[1072,200],[1090,253],[1132,301],[1154,324],[1154,358],[993,394],[790,405],[587,383]];

// Closed Catmull-Rom spline through the points, as cubic Béziers.
export function smoothLoop(pts) {
  const n = pts.length, p = i => pts[(i + n) % n];
  let d = `M${pts[0]}`;
  for (let i = 0; i < n; i++) {
    const [a, b, c, e] = [p(i - 1), p(i), p(i + 1), p(i + 2)];
    d += `C${b[0] + (c[0] - a[0]) / 6},${b[1] + (c[1] - a[1]) / 6} ${c[0] - (e[0] - b[0]) / 6},${c[1] - (e[1] - b[1]) / 6} ${c}`;
  }
  return d + 'Z';
}

export function Hero(el) {
  el.innerHTML = `
    <img class="deco nebula-a" src="assets/nebula-1.svg" width="800" height="800" alt="">
    <img class="deco nebula-b" src="assets/nebula-2.svg" width="800" height="800" alt="">
    <img class="deco orbit orbit-lg" src="assets/orbit-lg.png" width="600" height="600" alt="">
    <img class="deco orbit orbit-md" src="assets/orbit-md.png" width="400" height="400" alt="">
    <img class="deco orbit orbit-sm" src="assets/orbit-sm.png" width="200" height="200" alt="">
    <div class="hero-copy">
      <div>
        <div class="section-label hud">${site.label}</div>
        <h1>${site.headline.join('<br>')} <span class="glitch" data-text="${site.glitchWords[0]}" aria-live="off">${site.glitchWords[0]}</span></h1>
      </div>
      <div class="hero-welcome">
        <p>${site.intro}</p>
        <a class="anchor" href="#about">Get to know us <img src="assets/arrow-down.svg" width="16" height="16" alt=""></a>
      </div>
    </div>
    <div class="hero-image">
      <video src="assets/11.mp4" poster="assets/black-hole-poster.jpg" width="1280" height="720" muted loop playsinline aria-hidden="true"></video>
      <svg class="disk-path" viewBox="0 0 1280 720" aria-hidden="true"><path d="${smoothLoop(DISK)}"/></svg>
      ${planets.map(name => `<button class="planet" type="button" aria-label="${name}"><span class="planet-name">${name}</span></button>`).join('')}
    </div>`;
  Glitch(el.querySelector('.glitch'), site.glitchWords);
  // Autoplay only when the viewer allows motion; otherwise the poster frame stays.
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!still) el.querySelector('video').play().catch(() => {});
  Planets(el.querySelector('.disk-path path'), [...el.querySelectorAll('.planet')], still);
}

// Moves each marker along the orbit, evenly spaced; slow enough that a hovered name stays readable.
function Planets(path, markers, still) {
  const len = path.getTotalLength();
  const at = markers.map((_, i) => i / markers.length);
  let last = performance.now();
  const frame = now => {
    const step = (now - last) / 600000; // one lap per 10 minutes
    last = now;
    markers.forEach((m, i) => {
      at[i] = (at[i] - step + 1) % 1; // path runs clockwise on screen, so step backwards
      const p = path.getPointAtLength(at[i] * len);
      m.style.left = `${p.x / 12.8}%`;
      m.style.top = `${p.y / 7.2}%`;
    });
    if (!still) requestAnimationFrame(frame);
  };
  frame(last);
}
