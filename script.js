document.getElementById('year').textContent = new Date().getFullYear();

// Highlight the nav link for the section currently in view.
const navLinks = [...document.querySelectorAll('nav a')];
const targets = navLinks
  .map(a => ({ a, el: document.querySelector(a.getAttribute('href')) }))
  .filter(t => t.el);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      targets.forEach(t => t.a.classList.toggle('active', t.el === entry.target));
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  targets.forEach(t => observer.observe(t.el));
}
