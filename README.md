# Uchindami Mkandawire — Engineering Portfolio

This is my personal portfolio for the Internet and Web Services assignment at MUBAS. It brings together my background, technical skills, engineering projects and an article on artificial intelligence in embedded systems.

The site is built with HTML, CSS and JavaScript. It includes light and dark themes, mobile navigation, project filters and a feed of my recent public GitHub repositories.

## Links

- [Repository](https://github.com/Student-Work-Classroom-Demo-MUBAS/personal-portfolio-assignment)
- Live website: link to be added.
- Figma design: link to be added.
- Homepage screenshot: to be added.

## Pages

The homepage introduces my work and includes a contact section. The About page covers my background and skills, while the Projects page links to five projects:

- GRIFFIN fuel monitoring system
- Smart Irrigation
- Smart House
- Home Network Design and Configuration
- Library Management System

There is also a technical article and a custom 404 page. The Griffin, Smart House and Networking pages explain the problem, my contribution, the tools used and what I learned. The Library Management and Smart Irrigation pages still need more detail.

## Running the site

Use the `main` branch for the website. The `feature/reports` branch holds the documentation.

Open the project folder with VS Code and use Live Server, or run this command from the project folder if Python is installed:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000/index.html`. No build step or package installation is needed. The GitHub feed and the About page's technology icons need an internet connection.

## File organisation

The HTML files sit in the project root. `style.css` contains the shared styles, and `script.js` handles navigation, theme switching, form validation, project filtering and the GitHub feed. Images are stored in `assets/images/` and social icons in `assets/icons/`.

The project screenshots use WebP to reduce file size. The Cisco and Griffin screenshots were converted losslessly. The Smart House image was converted at quality 80 using Google's `cwebp` tool.

## CV

[Download my CV](assets/documents/uchindami-mkandawire-cv.pdf). It is also available from the Home and About pages.

## Work still to finish

The Contact links on Griffin and Smart House need to point to the homepage contact section. The article needs a final word-count check and expansion to meet the 500-word requirement.

The contact form checks input but does not send messages yet. Visitors can use the email link instead. Browser testing, final screenshots, Lighthouse results and the live website and Figma links still need to be added.

## Credits

The About page uses Devicon technology icons. The site uses the system fonts Segoe UI, Arial and sans-serif. Credits and permissions for the photographs, illustrations and SVG icons still need to be completed.

## Project notes

- [Design notes](docs/design-notes.md)
- [Decision log](docs/decision-log.md)
- [AI-use disclosure](docs/ai-use.md)
- [Testing checklist](docs/testing-checklist.md)
