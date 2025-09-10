document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('[data-hamburger]');
  const panel = document.getElementById('site-nav');
  if (!btn || !panel) return;

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!isOpen));
    document.documentElement.classList.toggle('nav-open', !isOpen);
    panel.classList.toggle('open', !isOpen);
  });
});