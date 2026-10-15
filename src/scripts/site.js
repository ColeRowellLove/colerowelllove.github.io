const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Cycle the highlighted topic on the home page.
const rotator = document.querySelector('[data-words]');
if (rotator && !reduceMotion) {
  const words = rotator.dataset.words.split('|');
  let i = 0;
  setInterval(() => {
    i = (i + 1) % words.length;
    rotator.textContent = words[i];
  }, 2200);
}

// Fade cards in as they scroll into view. Content stays visible if this can't run.
if ('IntersectionObserver' in window && !reduceMotion) {
  const items = document.querySelectorAll('.entry, .stats li, .skills > div');
  document.documentElement.classList.add('js-reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  items.forEach((el) => observer.observe(el));
}

// Dark/light toggle. With no saved choice the site follows the OS setting.
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
  const root = document.documentElement;
  const osLight = window.matchMedia('(prefers-color-scheme: light)');
  const current = () => root.dataset.theme || (osLight.matches ? 'light' : 'dark');
  const sync = () => {
    const target = current() === 'dark' ? 'Light mode' : 'Dark mode';
    themeToggle.textContent = target;
    themeToggle.setAttribute('aria-label', `Switch to ${target.toLowerCase()}`);
  };
  sync();
  themeToggle.hidden = false;
  osLight.addEventListener('change', sync);
  themeToggle.addEventListener('click', () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage unavailable: the choice just won't be remembered.
    }
    sync();
  });
}
