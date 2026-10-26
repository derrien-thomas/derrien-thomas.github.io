// Theme toggle: the button shows the theme it switches to
const root = document.documentElement;
const toggle = document.getElementById('themeToggle');

function label() {
  toggle.textContent = root.dataset.theme === 'dark' ? 'light' : 'dark';
}

if (toggle) {
  label();
  toggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    label();
  });
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  if (!saved) { root.dataset.theme = e.matches ? 'dark' : 'light'; if (toggle) label(); }
});
