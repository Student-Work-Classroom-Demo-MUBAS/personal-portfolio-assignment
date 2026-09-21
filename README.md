# Uchindami Mkandawire — Engineering Portfolio

A personal portfolio for the Internet and Web Services assignment at MUBAS. The site introduces my interests in web development, embedded systems, artificial intelligence and data, and presents engineering projects and technical writing for prospective employers and collaborators.

## Submission links

- **Live website:** TODO — add the verified deployed URL.
- **Figma:** TODO — add the shareable design and prototype URL.
- **Repository:** https://github.com/Student-Work-Classroom-Demo-MUBAS/personal-portfolio-assignment
- **Website screenshot:** TODO — capture the finished homepage and embed the image here.

The live and Figma URLs also need to appear in the Classroom submission comment. These placeholders do not indicate completed deployment or design work.

## Pages and features

| Page | Content |
| --- | --- |
| `index.html` | Introduction, skills overview, featured projects, article preview and contact form |
| `about.html` | Background, engineering approach and technology capabilities |
| `projects.html` | Five project summaries, category filters and recent GitHub repositories |
| `article.html` | Artificial Intelligence in Embedded Systems, with a responsive table of contents |
| `404.html` | Custom missing-page screen with navigation back to the portfolio |

The site uses semantic HTML, one shared CSS file and plain JavaScript. Features include a saved light/dark preference, mobile navigation, custom contact-field error messages, project filtering and a live GitHub API request with loading, empty, failure and retry states. No build step is required.

## Run locally

1. Clone this repository and open its folder in your editor.
2. Serve the folder with a static HTTP server. For example, with Python installed:

   ```sh
   python -m http.server 8000
   ```

3. Open `http://localhost:8000/index.html` in a browser. Alternatively, use your editor's local preview server, with the repository root as its document root.
4. Keep an internet connection available for the GitHub feed and the external Devicon stylesheet on the About page.

The GitHub feed requests the six most recently updated public repositories for `Jeshurun-coder`. It uses an unauthenticated request and requires no API key; rate limits or network failures may trigger the retry message. The contact form validates input locally but does not currently deliver messages. Use the email link to make contact.

## Project structure

```text
index.html / about.html / projects.html / article.html / 404.html
style.css                  Shared layout, components and themes
script.js                  Navigation, theme, form, article and API behaviour
assets/images/             Portraits, illustrations and project images
assets/icons/              Local social/contact SVGs
docs/design-notes.md        Audience, sitemap and design-system notes
docs/decision-log.md        Implementation decisions and trade-offs
docs/ai-use.md              AI assistance disclosure draft
docs/testing-checklist.md   Verification and submission evidence still to collect
```

## Current limitations

- Homepage logo and Home links reference missing `home.html` instead of `index.html`.
- Five project-detail links point to pages not yet present. Project summaries are not full case studies.
- The linked CV PDF is missing from `assets/documents/`.
- The article body is approximately 490 words including its section headings; expand the actual prose beyond the required 500 words.
- Contact submission has no delivery service. LinkedIn is shown as pending on the main pages.
- The 404 page uses root-relative asset and navigation paths; verify these against the deployment base path.
- Spacing, font sizes and supporting colours now use shared CSS custom properties; the existing page-specific desktop-first overrides still need responsive review.
- Deployment, Figma deliverables and browser-testing results are not verified by these documents.

## Documentation and verification

Read the [design notes](docs/design-notes.md), [decision log](docs/decision-log.md), [AI-use note](docs/ai-use.md), and [testing checklist](docs/testing-checklist.md). The documentation describes the current implementation; proposed improvements and missing evidence are labelled explicitly.

## Asset credits

| Asset | Source / attribution status |
| --- | --- |
| Technology icons on the About page | Devicon, loaded from the version 2.16.0 stylesheet on jsDelivr; confirm upstream licence and any required attribution before submission |
| Typography | System font stack: Segoe UI, Arial, sans-serif; no bundled font files |
| `assets/icons/*.svg` and inline SVG icons | TODO — record the original source/author and licence; repository contents alone do not establish ownership |
| Portrait files and `uchi.jpeg` | TODO — confirm photographer/source and disclose any background removal or AI editing |
| Project photographs, diagrams and other images in `assets/images/` | TODO — list each source, author, licence or permission, including any original work and AI-generated images |

Do not treat an image being stored locally as evidence that it is original or licensed for reuse.
