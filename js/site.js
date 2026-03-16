/* ====================================================
   GOVARDHA.NET — SHARED SITE SCRIPT

   Handles:
     - Scroll progress bar (#scrollBar)
     - Reveal-on-scroll (.reveal → .visible)
     - Active nav link highlighting
   ==================================================== */

/* ── Scroll progress bar ─────────────────────────── */
const scrollBar = document.getElementById('scrollBar');
if (scrollBar) {
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    scrollBar.style.transform = max > 0 ? `scaleX(${scrollY / max})` : 'scaleX(0)';
  }, { passive: true });
}

/* ── Reveal on scroll ────────────────────────────── */
/* Any element with class="reveal" fades + slides in  */
/* when it enters the viewport.                       */
const revealIO = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealIO.unobserve(entry.target);
    }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -24px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  /* Auto-stagger siblings inside the same parent container */
  if (!el.dataset.delay) {
    const siblings = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
    const idx = siblings.indexOf(el);
    if (idx > 0) el.style.transitionDelay = `${idx * 0.07}s`;
  } else {
    el.style.transitionDelay = el.dataset.delay;
  }
  revealIO.observe(el);
});

/* ── Active nav link ─────────────────────────────── */
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  const isHome = href === '/';
  if (isHome ? currentPath === '/' : href !== '/' && currentPath.startsWith(href)) {
    a.classList.add('active');
  }
});
