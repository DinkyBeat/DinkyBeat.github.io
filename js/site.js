/* GOVARDHA.NET — SITE SCRIPT */

/* Active nav link */
const path = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === '/' ? path === '/' : href !== '/' && path.startsWith(href)) {
    a.classList.add('active');
  }
});
