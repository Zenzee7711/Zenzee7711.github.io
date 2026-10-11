# Phone Thant Kyaw — personal portfolio

A local portfolio with light/dark themes, filterable projects, accessible project dialogs, and a full road-risk case study. Plain HTML, CSS and JavaScript; no package installation required.

## Preview

Run `npm run dev`, then open http://localhost:4173. Requires Node.js 18+. Run `npm run build` after editing the homepage template or project data. `npm run check` checks JavaScript syntax.

## Edit

- `index.template.html`: homepage copy, experience, skills, and contact.
- `projects.json`: project cards and popup details. This is the source of truth; do not edit generated cards in dist/index.html.
- `dist/work/road-risk.html`: full road-risk case study.
- `dist/style.css`: responsive layout, colours, typography, and motion.
- `dist/theme.js` and `dist/app.js`: theme, filters, dialogs, and section navigation.
- `dist/assets/Phone-Thant-Kyaw-Resume.pdf`: the published resume. Built from LaTeX at
  `C:/ClaudePro/Internship-Resume-2027/resume/resume.tex`; rebuild with
  `pdflatex -jobname=Phone_Thant_Kyaw_Resume resume.tex` and copy the result here. It
  deliberately carries no phone number, because this site is public. The copy that does
  include it is built from the same source with `build-contact.tex` and is for sending to
  employers directly, never for publishing.
- `dist/assets/Phone-Thant-Kyaw-Transcript.pdf`: the official MFU transcript, redacted for
  publication. The student ID, the verification QR code and the registrar's signature are
  painted out and the pages re-encoded, so the removed content is gone rather than merely
  covered. Name, degree, every course, grade and the GPA remain. Regenerate it the same way
  if you ever publish a newer transcript — do not upload the original scan.

## Add a project

Add an object to `projects.json` with unique `id`, `category` (software, ai, or hardware; match existing entries), `type`, `year`, `title`, `summary`, `role`, and `tags`. Use `details` for trusted HTML shown in a popup, or `href` for a separate case-study page. Optionally add `image`, `imageAlt`, and `imageCaption`. Without an image or named illustration, the card gets a numbered graphic. Run `npm run build`; the count updates automatically. Adding a new category also requires a filter button in the template.

## Assets and provenance

The portrait and exchange photographs were supplied by Phone. FACE IT uses FACEITD1.JPG. Road-risk screenshots come from the supplied project assets; the other project graphics are labelled illustrations. Google Fonts load with system fallbacks; remaining assets are local.

Content comes from the supplied resume and project database. Conflicting senior-project model
metrics are deliberately omitted from both the website and the resume: the source documents
disagree about which evaluation run is official, so no headline figure is claimed until that
is reconciled. XGBoost is likewise omitted, because no saved artifact corroborates it.
Licence plates in the road-risk screenshots are pixelated. LinkedIn profile content could not
be independently read behind its sign-in wall; courses come from the supplied materials.

The earlier design is preserved locally in `previous-design/`, which is git-ignored and not
published.

## Deployment

Published to GitHub Pages at <https://zenzee7711.github.io> from this repository. Pushing to
`main` triggers `.github/workflows/deploy.yml`, which runs `node build.mjs` and publishes
`dist/`. To update the site, edit the sources above, commit and push:

```bash
npm run build   # optional locally; the workflow runs it too
git add -A
git commit -m "Describe what changed"
git push
```
