// Cycles words in `el` with a scramble + RGB-split glitch, like a station terminal re-tuning.
const GLYPHS = '▓▒░<>/\\_#*01ΔΣ';

export function Glitch(el, words, hold = 2800) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || words.length < 2) return;
  let i = 0;

  const swap = () => {
    const next = words[i = (i + 1) % words.length];
    const start = performance.now(), dur = 650;
    el.classList.add('is-glitching');
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      // Letters lock in left to right; the rest stay as noise.
      const locked = Math.floor(p * next.length);
      el.textContent = next.slice(0, locked) +
        Array.from(next.slice(locked), (c) => c === ' ' ? ' ' : GLYPHS[Math.random() * GLYPHS.length | 0]).join('');
      el.dataset.text = el.textContent;
      if (p < 1) requestAnimationFrame(tick);
      else { el.classList.remove('is-glitching'); setTimeout(swap, hold); }
    };
    requestAnimationFrame(tick);
  };

  setTimeout(swap, hold);
}
