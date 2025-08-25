// Nav toggle
const navToggleButton = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');
if (navToggleButton && primaryNav) {
  navToggleButton.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    navToggleButton.setAttribute('aria-expanded', String(isOpen));
  });
}

// Theme toggle with localStorage
const themeToggleButton = document.getElementById('themeToggle');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === 'light') {
    root.classList.add('light');
  } else {
    root.classList.remove('light');
  }
}

applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

if (themeToggleButton) {
  themeToggleButton.addEventListener('click', () => {
    const isLight = root.classList.toggle('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

// Smooth scroll for same-page links
document.addEventListener('click', (e) => {
  const target = e.target;
  if (target instanceof HTMLAnchorElement && target.getAttribute('href')?.startsWith('#')) {
    const id = target.getAttribute('href');
    const el = id ? document.querySelector(id) : null;
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// Scroll reveal via IntersectionObserver
const revealElements = Array.from(document.querySelectorAll('.reveal'));
if ('IntersectionObserver' in window && revealElements.length > 0) {
  const io = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }
  }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  for (const el of revealElements) {
    io.observe(el);
  }
}
