import {readFile, writeFile} from 'node:fs/promises';
const root = new URL('./', import.meta.url);
const read = file => readFile(new URL(file, root), 'utf8');
const projects = JSON.parse(await read('projects.json'));
const escape = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const ids = new Set();
for (const project of projects) {
  if (!project.id || ids.has(project.id) || !project.title || !project.summary || (!project.href && !project.details)) throw new Error('Each project needs a unique id, title, summary, and destination or details.');
  ids.add(project.id);
}
const illustrations = {
  booking: `<div class="booking-art" aria-hidden="true"><div class="mini-window"><div class="mini-nav"><b>room /</b><span>Find a space</span></div><h4>A place to focus.</h4><div class="calendar"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><i></i><i class="booked"></i><i></i><i></i><i></i><i></i><i></i><i class="booked"></i><i></i><i></i></div><div class="mini-footer">Room selected <b>Request booking <svg class='ico' width='16' height='16' viewBox='0 0 16 16' fill='none' stroke='currentColor' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'><path d='M4.5 11.5 11.5 4.5M6.2 4.5h5.3v5.3'/></svg></b></div></div><span class="visual-caption">BOOKING FLOW / ILLUSTRATION</span></div>`,
  flight: `<div class="flight-art" aria-hidden="true"><span class="airport">BKK</span><div class="flight-path"><span>✈</span></div><span class="airport">DATA</span><div class="flight-label">RECORDS <svg class='ico' width='16' height='16' viewBox='0 0 16 16' fill='none' stroke='currentColor' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'><path d='M3.2 8h9.6M9.2 4.4 12.8 8l-3.6 3.6'/></svg> MODELS <svg class='ico' width='16' height='16' viewBox='0 0 16 16' fill='none' stroke='currentColor' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'><path d='M3.2 8h9.6M9.2 4.4 12.8 8l-3.6 3.6'/></svg> STREAMING</div><span class="visual-caption">PIPELINE / ILLUSTRATION</span></div>`,
  robot: `<div class="robot-art" aria-hidden="true"><svg viewBox="0 0 450 230" fill="none" stroke="currentColor" stroke-width="3"><path d="m155 78 135-12 35 23-132 18zM155 78v45l38 23V107m0 39 132-20V89M172 136l-25 49 17 21m45-65 20 46-12 23m70-80 35 35-7 38m-1-80 29 30 22 37"/><circle cx="172" cy="132" r="9"/><circle cx="209" cy="140" r="9"/><circle cx="287" cy="128" r="9"/><circle cx="314" cy="123" r="9"/><path stroke-dasharray="4 5" d="M76 52h50m-25-25v50m236-41h32m-16-16v32"/></svg><span class="visual-caption">HARDWARE STUDY / ILLUSTRATION</span></div>`
};
const cards = projects.map((project,index) => {
  const action = project.href ? `<a class="project-link" href="${escape(project.href)}">Read the full case study <span><svg class='ico' width='16' height='16' viewBox='0 0 16 16' fill='none' stroke='currentColor' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'><path d='M4.5 11.5 11.5 4.5M6.2 4.5h5.3v5.3'/></svg></span></a>` : `<button class="project-link" data-project="${escape(project.id)}">Project details <span><svg class='ico' width='16' height='16' viewBox='0 0 16 16' fill='none' stroke='currentColor' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'><path d='M4.5 11.5 11.5 4.5M6.2 4.5h5.3v5.3'/></svg></span></button>`;
  const destinations = project.liveUrl ? `<div class="project-destinations"><a href="${escape(project.liveUrl)}" target="_blank" rel="noopener noreferrer">Open live app</a><a href="${escape(project.repoUrl)}" target="_blank" rel="noopener noreferrer">GitHub repository</a></div>` : '';
  const visual = project.image ? `<figure class="project-image"><img src="${escape(project.image)}" alt="${escape(project.imageAlt || project.title)}" loading="lazy"><figcaption>${escape(project.imageCaption || '')}</figcaption></figure>` : illustrations[project.visual] || `<div class="text-art" aria-hidden="true">${String(index+1).padStart(2,'0')}</div>`;
  return `<article class="project-card" data-category="${escape(project.category)}">${visual}<div class="project-card-body"><div class="project-meta"><span>${escape(project.type)}</span><span>${escape(project.year)}</span></div><h3>${escape(project.title)}</h3><p>${escape(project.summary)}</p><p class="project-role">${escape(project.role)}</p><ul class="tags">${project.tags.map(tag=>`<li>${escape(tag)}</li>`).join('')}</ul>${destinations}${action}</div></article>`;
}).join('');
let html = await read('index.template.html');
// Characters like U+2197 and U+2733 have emoji presentation, so phones render
// them as colour emoji instead of text glyphs. Use an inline SVG icon instead.
const emojiGlyphs = [...'\u2733\u2197\u2198\u2199\u2196\u2191\u2193\u2192\u2190'];
for (const [file, text] of [['index.template.html', html], ['projects.json', JSON.stringify(projects)]]) {
  const found = emojiGlyphs.filter(c => text.includes(c));
  if (found.length) {
    throw new Error(
      `${file} contains ${found.map(c => 'U+' + c.codePointAt(0).toString(16).toUpperCase()).join(', ')} ` +
      `(${found.join(' ')}). Phones draw these as emoji. Replace with an inline <svg class='ico'> icon.`
    );
  }
}

html = html.replace('{{PROJECTS}}',cards).replace('{{COUNT}}',projects.length);
await writeFile(new URL('dist/index.html',root),html);
await writeFile(new URL('dist/projects-data.js',root),`window.portfolioProjects = ${JSON.stringify(projects).replace(/</g,'\\u003c')};\n`);
console.log(`Built ${projects.length} projects.`);
