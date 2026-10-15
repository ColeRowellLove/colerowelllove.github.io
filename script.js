const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* theme */
const saved = (() => { try { return localStorage.getItem('theme'); } catch { return null; } })();
root.dataset.theme = saved || 'dark';
document.getElementById('theme').addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch {}
});

document.getElementById('year').textContent = new Date().getFullYear();

/* nav: scrolled state, progress bar, mobile menu, active link */
const nav = document.getElementById('nav');
const bar = document.getElementById('progress');
const links = document.getElementById('links');
const menu = document.getElementById('menu');
function onScroll() {
  nav.classList.toggle('scrolled', scrollY > 10);
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();
menu.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});
links.addEventListener('click', e => {
  if (e.target.tagName === 'A') { links.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
});

const sections = [...links.querySelectorAll('a')].map(a => ({ a, el: document.querySelector(a.getAttribute('href')) }));
const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) sections.forEach(s => s.a.classList.toggle('active', s.el === en.target));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => s.el && activeObserver.observe(s.el));

/* reveal on scroll + stat count-up */
function countUp(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = +el.dataset.decimals || 0;
  const suffix = el.dataset.suffix || '';
  if (reduceMotion) return;
  const start = performance.now();
  const dur = 1400;
  (function tick(now) {
    const t = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = (target * eased).toFixed(decimals) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  })(start);
}
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('in');
    en.target.querySelectorAll('[data-count]').forEach(countUp);
    io.unobserve(en.target);
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (el.matches('.skill-card') ? (i % 3) * 90 : 0) + 'ms';
  io.observe(el);
});

/* cursor spotlight on cards */
document.querySelectorAll('.spot').forEach(card => {
  card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', e.clientX - r.left + 'px');
    card.style.setProperty('--my', e.clientY - r.top + 'px');
  });
});

/* typing effect */
const phrases = [
  'machine learning systems.',
  'LLM evaluation pipelines.',
  'medical imaging models.',
  'fast, production-ready inference.',
  'full-stack device software.'
];
const typed = document.getElementById('typed');
if (reduceMotion) {
  typed.textContent = phrases[0];
} else {
  let p = 0, c = 0, del = false;
  (function type() {
    const word = phrases[p];
    typed.textContent = word.slice(0, c);
    let wait = del ? 28 : 65;
    if (!del && c === word.length) { del = true; wait = 1700; }
    else if (del && c === 0) { del = false; p = (p + 1) % phrases.length; wait = 350; }
    else c += del ? -1 : 1;
    setTimeout(type, wait);
  })();
}

/* hero: animated neural-network particle field */
(function () {
  const canvas = document.getElementById('net');
  const ctx = canvas.getContext('2d');
  let w, h, nodes = [], mouse = { x: -999, y: -999 };
  const dpr = Math.min(devicePixelRatio || 1, 2);

  function resize() {
    const r = canvas.getBoundingClientRect();
    w = r.width; h = r.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(90, (w * h) / 14000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.8
    }));
  }
  addEventListener('resize', resize);
  canvas.parentElement.addEventListener('pointermove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  });
  canvas.parentElement.addEventListener('pointerleave', () => { mouse.x = mouse.y = -999; });

  const LINK = 130;
  function frame() {
    ctx.clearRect(0, 0, w, h);
    const rgb = getComputedStyle(root).getPropertyValue('--net').trim();
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
      const dx = n.x - mouse.x, dy = n.y - mouse.y, d = Math.hypot(dx, dy);
      if (d < 120) { n.x += (dx / d) * 1.2; n.y += (dy / d) * 1.2; }
    }
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK) {
          ctx.strokeStyle = `rgba(${rgb}, ${(1 - d / LINK) * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      ctx.fillStyle = `rgba(${rgb}, 0.8)`;
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.283); ctx.fill();
    }
    if (!reduceMotion) requestAnimationFrame(frame);
  }
  resize();
  frame();
})();
