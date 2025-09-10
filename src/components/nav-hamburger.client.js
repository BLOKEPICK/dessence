document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('[data-hamburger]');
  const nav = document.getElementById('site-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!isOpen));
    document.documentElement.classList.toggle('nav-open', !isOpen);
    nav.classList.toggle('open', !isOpen);
  });
});