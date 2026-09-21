# Design notes

This is a retrospective description of the current portfolio and a plan for completing its design documentation. It is not evidence that the design work preceded implementation. Confirm the audience assumptions and reconcile these notes with the actual Figma file before submission.

## Purpose and audience

The portfolio should help someone understand what Uchindami can build, inspect evidence of that work and make contact.

| Intended visitor | Need | Design response |
| --- | --- | --- |
| Graduate recruiter | Quickly identify the discipline, capabilities and relevant experience | Clear introduction, skills overview, featured projects and downloadable CV entry point |
| Engineering reviewer | Understand contribution, technical choices, outcomes and limitations | Project case studies and a technical article; the detailed case studies still need writing |
| Potential collaborator | Find relevant experience and a practical contact route | Project categories, GitHub profile, email and contact section |

These are proposed audience profiles, not findings from user interviews. Add any actual discovery work and explain how it changed the design.

## Sitemap and main journeys

```text
Home (index.html)
├── About (about.html)
├── Projects (projects.html)
│   ├── GRIFFIN detail — linked, not implemented
│   ├── Smart Irrigation detail — linked, not implemented
│   ├── Smart House detail — linked, not implemented
│   ├── Home Network detail — linked, not implemented
│   └── Library Management detail — linked, not implemented
├── Technical article (article.html)
├── Contact (#contact on Home)
└── Download CV — file missing
Missing URL → custom 404 (hosting behaviour still to verify)
```

Primary journey: introduction → relevant project → technical evidence → contact. Secondary journey: About → skills → CV. Shared navigation connects the main pages; the article table of contents supports longer reading.

## Content plan

- Home: concise engineering identity, selected work and clear next actions.
- About: personal background, practical approach and capabilities supported by examples. Verify the displayed statistics before publishing.
- Projects: at least three substantial accounts of the problem, personal contribution, tools, results and lessons. Existing cards provide an overview only.
- Article: at least 500 words of technical explanation in the author's own voice, ideally with an example from personal work.
- Contact: labelled fields and actionable validation messages, plus an email alternative.
- CV: current, readable PDF with a working download.

## Colour system

Values below come from `style.css`.

| Token | Dark | Light |
| --- | --- | --- |
| Background | `#031525` | `#f5faff` |
| Surface | `#081f34` | `#ffffff` |
| Muted surface | `#0b2843` | `#eaf4ff` |
| Main text | `#f0f6ff` | `#0b1733` |
| Muted text | `#b2c9e0` | `#405574` |
| Primary accent | `#38b6ff` | `#0060df` |
| Text on primary | `#031525` | `#ffffff` |
| Focus indicator | `#fbbf24` | `#0055cc` |

Calculated contrast ratios use sRGB relative luminance and `(lighter + 0.05) / (darker + 0.05)`, rounded to two decimals. These are token-pair calculations, not a complete accessibility audit of rendered elements.

| Foreground / background | Dark ratio | Light ratio |
| --- | --- | --- |
| Main text / page background | 16.99:1 | 16.88:1 |
| Muted text / page background | 10.83:1 | 7.22:1 |
| Main text / surface | 15.39:1 | 17.73:1 |
| Muted text / surface | 9.81:1 | 7.58:1 |
| Primary accent / page background | 8.18:1 | 5.35:1 |
| Text on primary / primary | 8.18:1 | 5.62:1 |
| Focus indicator / page background | 11.06:1 | 6.31:1 |

The listed text pairs exceed the brief's 4.5:1 body-text target. Hover, disabled, error, SVG, translucent and image-backed states still need separate checks.

## Typography and spacing

The current font stack is Segoe UI, Arial, sans-serif. Base body text is `1rem` with a `1.65` line height. Base heading sizes are `1.75rem` for h1 and `1.375rem` for h2/h3, with page-specific and responsive overrides. Smaller labels include `0.8125rem`, `0.875rem` and `0.9375rem`; some headings use fluid `clamp()` sizes.

Font sizes now use shared `--font-size-*` properties, including named fluid sizes for page headings. Margin, padding, scroll offsets and gaps use `--space-*` properties. The tokens preserve the original values and units to avoid changing the layout during this refactor; zero and automatic spacing remain literal CSS keywords/values. Supporting surface, illustration, error and shadow colours also use properties. Mirror the implemented values in Figma, and consider reducing the number of closely spaced sizes after visual testing.

## Component states

| Component | Current behaviour / state coverage |
| --- | --- |
| Primary and secondary buttons | Distinct filled/outlined treatments, hover styles and visible keyboard focus |
| Theme switch | Sun/moon visuals and `aria-pressed`; choice saved when local storage is available |
| Mobile menu | Expanded/collapsed state, Escape handling and focus restoration |
| Contact fields | Visible labels, required/email/length validation, inline errors and `aria-invalid`; disabled before JavaScript initialises |
| Contact submission | Error summary and focus on the first invalid field; valid input gets an explicit message that delivery is unavailable |
| Project filters | Selected state via `aria-pressed`, matching cards shown and result count announced |
| GitHub feed | Loading, results, empty response, error and retry states |

Reproduce these states in Figma, including hover, focus, disabled and error examples. Verify actual contrast and keyboard usability in the browser.

## Responsive behaviour and accessibility

The stylesheet uses Grid and Flexbox, with major widths at 768, 1024 and 1200px and additional compact-screen rules. Some page-specific rules use desktop-to-mobile overrides; review the cascade before describing the whole stylesheet as consistently mobile-first. Test at the breakpoints and immediately below them.

The implementation includes skip links, image alternatives, visible focus styles, live status announcements and reduced-motion rules. Project and skill rows can scroll horizontally, so check their keyboard access and discoverability on small screens. A code-level feature does not by itself establish that the full site passes accessibility testing.

## Figma evidence to add

- Shareable file URL and clickable prototype starting point.
- Greyscale wireframes for Home, Projects and About.
- Documented colours/contrast, type scale, spacing and component states.
- Desktop and mobile mockups of every final page.
- At least one connected navigation → project → contact flow.
- Existing version history retained, with an honest account of design changes.

Figma completion has not been verified in this repository review.
