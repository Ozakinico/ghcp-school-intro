const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-nav');
const navLinks = document.querySelectorAll('a[href^="#"]');
const revealTargets = document.querySelectorAll('.reveal');

const closeMenu = () => {
  if (!header || !navToggle) return;
  header.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'メニューを開く');
};

const openMenu = () => {
  if (!header || !navToggle) return;
  header.classList.add('is-open');
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.setAttribute('aria-label', 'メニューを閉じる');
};

const toggleHeaderState = () => {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 12);
};

window.addEventListener('scroll', toggleHeaderState, { passive: true });
window.addEventListener('load', toggleHeaderState);

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = header?.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
      return;
    }
    openMenu();
  });
}

if (primaryNav) {
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    if (!header?.classList.contains('is-open')) return;
    if (target.closest('.primary-nav') || target.closest('.nav-toggle')) return;

    closeMenu();
  });
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 767) {
    closeMenu();
  }
});

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (header?.classList.contains('is-open')) {
      closeMenu();
    }
  });
});

const observer = new IntersectionObserver(
  (entries, io) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -10% 0px',
  }
);

revealTargets.forEach((target) => observer.observe(target));
