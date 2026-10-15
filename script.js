const root = document.documentElement;
const saved = (() => { try { return localStorage.getItem('theme'); } catch { return null; } })();
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
root.dataset.theme = saved || (prefersDark ? 'dark' : 'light');

document.getElementById('theme').addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch {}
});

document.getElementById('year').textContent = new Date().getFullYear();
