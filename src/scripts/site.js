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
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  items.forEach((el) => observer.observe(el));
}
