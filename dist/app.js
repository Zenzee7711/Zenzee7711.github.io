const themeButtons = document.querySelectorAll('.theme-toggle');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
function updateThemeControls() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeButtons.forEach(button => {
    button.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    button.setAttribute('aria-pressed', String(dark));
    button.querySelector('.theme-label').textContent = dark ? 'Light' : 'Dark';
  });
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#101c26' : '#f5f7f9');
}
updateThemeControls();
themeButtons.forEach(button => button.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('ptk-theme', next); } catch {}
  updateThemeControls();
}));
systemTheme.addEventListener('change', event => {
  let saved; try { saved = localStorage.getItem('ptk-theme'); } catch {}
  if (!saved) { document.documentElement.dataset.theme = event.matches ? 'dark' : 'light'; updateThemeControls(); }
});
const dialog = document.querySelector('#project-dialog');
if (dialog) {
  let opener;
  document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
    const project = window.portfolioProjects.find(item => item.id === button.dataset.project);
    if (!project) return;
    opener = button;
    document.querySelector('#dialog-label').textContent = `${project.type} · ${project.year}`;
    document.querySelector('#dialog-title').textContent = project.title;
    document.querySelector('#dialog-content').innerHTML = project.details;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    dialog.scrollTop = 0;
  }));
  document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; opener?.focus(); });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
}
const cards = [...document.querySelectorAll('.project-card')];
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  cards.forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
  document.querySelector('#filter-status').textContent = `${cards.filter(card => !card.hidden).length} projects shown`;
}));
const year = document.querySelector('#year'); if (year) year.textContent = new Date().getFullYear();
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.06 });
  document.querySelectorAll('.section-heading, .about-copy, .teaching, .exchange-intro, .skill-panel, .learning-grid article').forEach(element => { element.classList.add('reveal'); observer.observe(element); });
  reducedMotion.addEventListener('change', event => { if (event.matches) { document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible')); observer.disconnect(); } });
}
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('.header nav a')];
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) links.forEach(link => { if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); });
  }), {rootMargin:'-15% 0px -60% 0px'});
  document.querySelectorAll('#top, #work, #about, #experience, #skills, #contact').forEach(section => observer.observe(section));
}
