
document.addEventListener('DOMContentLoaded', () => {
  const dialogs = document.querySelectorAll('dialog[data-results]');
  dialogs.forEach(d => {
    const close = d.querySelector('[data-close]');
    close?.addEventListener('click', () => d.close());
    d.addEventListener('click', (e) => {
      if (e.target === d) d.close();
    });
    d.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') d.close();
    });
  });
  document.querySelectorAll('[data-open]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-open');
      const dialog = document.getElementById(id);
      dialog?.showModal();
    });
  });
});
