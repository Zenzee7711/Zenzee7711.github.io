(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const precise = matchMedia('(hover: hover) and (pointer: fine)');
  const root = document.documentElement;
  const surfaces = [...document.querySelectorAll('.portrait-panel, .project-card')];
  const properties = ['--depth-x','--depth-y','--depth-lift','--depth-shadow','--depth-pan','--depth-light'];
  let preference = true;
  try { preference = localStorage.getItem('ptk-depth') !== 'off'; } catch {}
  const control = document.createElement('button');
  control.type = 'button';
  control.className = 'depth-switch';
  document.body.append(control);
  const portrait = document.querySelector('.portrait-panel');
  if (portrait) {
    const orbit = document.createElement('div');
    orbit.className = 'depth-orbit';
    orbit.setAttribute('aria-hidden','true');
    orbit.innerHTML = '<div class="depth-orbit-core"><i></i><i></i><i></i><i></i><i></i><i></i></div>';
    portrait.append(orbit);
  }
  function reset(element) {
    element.classList.remove('depth-active');
    properties.forEach(property => element.style.removeProperty(property));
  }
  function update() {
    const enabled = preference && !reduced.matches && precise.matches;
    root.classList.toggle('depth-enabled', enabled);
    control.disabled = reduced.matches || !precise.matches;
    control.setAttribute('aria-pressed', String(enabled));
    control.textContent = reduced.matches ? 'Motion reduced' : !precise.matches ? 'Touch mode' : enabled ? '3D depth · on' : '3D depth · off';
    control.setAttribute('aria-label', reduced.matches ? '3D motion disabled by your reduced-motion preference' : !precise.matches ? '3D tilt disabled for touch input' : 'Toggle 3D depth effects');
    surfaces.forEach(reset);
  }
  surfaces.forEach(element => {
    element.classList.add('depth-surface');
    element.addEventListener('pointermove', event => {
      if (!root.classList.contains('depth-enabled') || event.pointerType === 'touch') return;
      const bounds = element.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, ((event.clientX-bounds.left)/bounds.width-.5)*2));
      const y = Math.max(-1, Math.min(1, ((event.clientY-bounds.top)/bounds.height-.5)*2));
      const angle = element === portrait ? 7 : 4;
      element.style.setProperty('--depth-x', `${-y*angle}deg`);
      element.style.setProperty('--depth-y', `${x*angle}deg`);
      element.style.setProperty('--depth-pan', `${x*5}px`);
      element.style.setProperty('--depth-lift','-4px');
      element.style.setProperty('--depth-shadow',`${x*12}px`);
      element.style.setProperty('--depth-light',`${(x+1)*50}% ${(y+1)*50}%`);
      element.classList.add('depth-active');
    });
    element.addEventListener('pointerleave', () => reset(element));
    element.addEventListener('pointercancel', () => reset(element));
    element.addEventListener('focusin', () => reset(element));
  });
  control.addEventListener('click', () => {
    preference = !preference;
    try { localStorage.setItem('ptk-depth', preference ? 'on' : 'off'); } catch {}
    update();
  });
  reduced.addEventListener('change',update);
  precise.addEventListener('change',update);
  window.addEventListener('blur', () => surfaces.forEach(reset));
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => surfaces.forEach(reset)));
  update();
})();
