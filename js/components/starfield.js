// Fixed twinkling starfield behind the whole page, drifting slowly toward the viewer.
export function Starfield(canvas) {
  const ctx = canvas.getContext('2d');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const colors = ['#f5f7ff', '#3baede', '#8ea0c7', '#6463c8'];
  let w, h, stars;

  const resize = () => {
    w = canvas.width = innerWidth * devicePixelRatio;
    h = canvas.height = innerHeight * devicePixelRatio;
    stars = Array.from({ length: Math.min(400, (innerWidth * innerHeight) / 4000) }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: (Math.random() * 1.4 + .3) * devicePixelRatio,
      c: colors[Math.random() * colors.length | 0],
      t: Math.random() * Math.PI * 2,
      v: Math.random() * .15 + .03,
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      if (!still) {
        s.t += .02;
        s.y -= s.v * devicePixelRatio;
        if (s.y < 0) s.y = h;
      }
      ctx.globalAlpha = .45 + Math.sin(s.t) * .35;
      ctx.fillStyle = s.c;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    if (!still) requestAnimationFrame(draw);
  };

  addEventListener('resize', () => { resize(); if (still) draw(); });
  resize();
  draw();
}
