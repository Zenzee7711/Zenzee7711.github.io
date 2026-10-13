# My portfolio

I'm Phone Thant Kyaw, a Computer Engineering student at Mae Fah Luang University in Chiang Rai, Thailand. This is where I share my software, AI/ML, and hardware projects, along with my teaching assistant work and university experiences.

**[Visit the portfolio](https://zenzee7711.github.io/)**

The site includes project summaries, a longer case study for my road-risk project, my resume, and ways to get in touch. I'll update it as I finish more projects.

It's built with plain HTML, CSS, and JavaScript. A small Node.js script generates the homepage from a template and project data. There's also a light/dark theme and an interactive skills keyboard with tool logos.

## Run locally

With Node.js installed, run:

```bash
npm run dev
```

Open [localhost:4173](http://localhost:4173). No package installation is needed.

## Updating the site

- `index.template.html` — homepage text and sections.
- `projects.json` — project cards and details.
- `dist/` — styles, scripts, images, documents, and the full case-study page.

After changing the template or project data, run `npm run build`. Edit those source files rather than the generated `dist/index.html` or `dist/projects-data.js`. `npm run check` checks the main JavaScript files for syntax errors.

GitHub Actions builds the site and publishes `dist/` to GitHub Pages when I push to `main`.

Tool logos come from [Devicon](https://github.com/devicons/devicon); its licence is included with the assets.
