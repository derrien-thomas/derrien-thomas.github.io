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

// BibTeX: show inline, copy to clipboard
document.querySelectorAll('.bib-toggle').forEach(btn => {
  const box = document.getElementById(btn.getAttribute('aria-controls'));
  btn.addEventListener('click', () => {
    box.hidden = !box.hidden;
    btn.setAttribute('aria-expanded', String(!box.hidden));
  });
  const copy = box.querySelector('.bib-copy');
  copy.addEventListener('click', () => {
    navigator.clipboard.writeText(box.querySelector('pre').textContent).then(() => {
      copy.textContent = 'copied';
      setTimeout(() => { copy.textContent = 'copy'; }, 1500);
    });
  });
});
