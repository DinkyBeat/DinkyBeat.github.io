/* GOVARDHA.NET — SITE SCRIPT */

/* Scroll progress bar */
const scrollBar = document.getElementById('scrollBar');
if (scrollBar) {
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    scrollBar.style.transform = max > 0 ? `scaleX(${scrollY / max})` : 'scaleX(0)';
  }, { passive: true });
}

/* Active nav link */
const path = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === '/' ? path === '/' : href !== '/' && path.startsWith(href)) {
    a.classList.add('active');
  }
});
