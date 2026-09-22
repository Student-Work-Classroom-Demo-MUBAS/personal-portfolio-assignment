# Design notes

## What the site is for

The portfolio introduces my work as an Electronics and Computer Engineering student. It is aimed at people who may want to hire me, work with me or learn more about my projects. They should be able to find my skills, look at examples of my work and reach me without searching through the whole site.

## Page structure

Home gives a quick introduction and highlights selected projects. About goes into my background and skills. Projects brings the work together, with separate pages for each project. The article has its own page so it can be read without distractions. Contact is a section on the homepage.

A typical route through the site is Home, then Projects, then a project detail page, followed by Contact. The navigation also gives visitors direct access to About and the article.

## Colours and text

The site has a dark navy theme and a light theme, both with blue accents. Colour values are shared through CSS custom properties so the theme switch can change them consistently.

| Colour | Dark theme | Light theme |
| --- | --- | --- |
| Background | `#031525` | `#f5faff` |
| Main text | `#f0f6ff` | `#0b1733` |
| Secondary text | `#b2c9e0` | `#405574` |
| Accent | `#38b6ff` | `#0060df` |
| Focus indicator | `#fbbf24` | `#0055cc` |

The font stack is Segoe UI, Arial and sans-serif. Body text uses a line height of 1.65 to give paragraphs enough space. Headings establish the page structure, while smaller labels identify categories and supporting information.

Spacing and font sizes currently use values written directly in the stylesheet. The final colours, text sizes and spacing should also be reflected in the Figma design.

## Project pages

The project pages explain the problem, the work involved, the tools used and the lessons learned. I preferred simple headings, so the extra numbered section labels were removed. Tools are shown as bullet lists rather than a row of spans.

The Networking page uses one Cisco Packet Tracer screenshot at the top. I chose this instead of keeping both a decorative illustration and a repeated image area lower down. The screenshot keeps its original proportions as the page changes size.

Griffin, Networking and Smart House have detailed write-ups. Library Management and Smart Irrigation still need fuller descriptions of the implementation, my contribution and the results.

## Different screen sizes

The layout uses Grid and Flexbox, with breakpoints at 550, 768, 1024 and 1200 pixels. Navigation collapses on smaller screens, and content adjusts to the available width. Some project and skill sections scroll horizontally.

These layouts still need a final browser check on mobile and desktop, especially around the breakpoints. Text, images and controls should fit without causing the whole page to scroll sideways.

## Accessibility

The site includes skip links, image descriptions, labelled form fields and visible keyboard focus. Buttons expose states such as an open menu or selected filter. Reduced-motion preferences are also supported.

The theme switch saves the chosen theme when browser storage is available. The contact form explains input errors and makes it clear that messages are not sent yet. These features still need keyboard and browser testing in both themes.

## Figma work

The documentation still needs the Figma link. The file should include wireframes, colours, typography, component states, mobile and desktop layouts, and a clickable route from a project to the contact section.
