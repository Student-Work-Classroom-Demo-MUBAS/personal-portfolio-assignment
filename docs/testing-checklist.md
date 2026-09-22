# Testing checklist

This is the list of checks for the final website. The completed items below were checked in the code. Browser tests are still open unless a result is recorded.

## Content and links

- [x] Check that the homepage no longer links to `home.html`.
- [x] Check that all five project pages exist.
- [x] Add problem, contribution, tools and reflection sections to Griffin, Networking and Smart House.
- [x] Update the three WebP image paths to `assets/images/`.
- [x] Keep one project image on the Networking page.
- [ ] Finish the Library Management and Smart Irrigation descriptions.
- [ ] Review project contributions, results and About-page statistics for accuracy.
- [ ] Add the CV PDF and try both download links.
- [ ] Check that the article has at least 500 words of main text.
- [ ] Fix the Griffin and Smart House Contact links to use `index.html#contact`.
- [ ] Open every page and check its links and images on the live site.
- [ ] Visit a missing URL and check the 404 page.

## Navigation and interactions

- [ ] Use the site with only a keyboard and check the skip link and focus order.
- [ ] Open and close the mobile menu, including with Escape.
- [ ] Switch themes and reload to check that the choice is saved.
- [ ] Check that the theme switch still works when browser storage is unavailable.
- [ ] Try every project filter and check the results.
- [ ] Check the article contents links and mobile disclosure.
- [ ] Check horizontally scrolling sections with touch and keyboard.
- [ ] Check reduced-motion behaviour.
- [ ] Look for console errors on every page.

## Contact form

- [ ] Submit empty fields and check the error messages.
- [ ] Try spaces only, an invalid email address and text over the length limits.
- [ ] Check that focus moves to the first invalid field.
- [ ] Enter valid details and check that the message clearly says nothing was sent.

## GitHub feed

- [ ] Check that repositories load successfully.
- [ ] Check the message for an empty result.
- [ ] Test a failed request and an offline connection.
- [ ] Test the timeout message and retry button.

## Layout and accessibility

- [ ] Check every page on mobile and desktop.
- [ ] Test at 550, 768, 1024 and 1200 pixels, and just below each breakpoint.
- [ ] Check for clipped text, stretched images and unwanted horizontal scrolling.
- [ ] Check text and control contrast in both themes, including hover and error states.
- [ ] Run each page through the W3C HTML validator and fix errors.
- [ ] Save mobile and desktop screenshots.
- [ ] Run Lighthouse on the deployed site and save the results. Targets: Performance 85+, Accessibility 90+, Best Practices 90+ and SEO 90+.

## Test results

Record the date, browser, screen size, result and screenshot location when each test is done.

| Test | Result | Details or evidence |
| --- | --- | --- |
| Local file references | Some fixes still needed | CV is missing; Griffin and Smart House link to `contact.html` |
| Networking image and local links | File targets checked | Cisco screenshot and linked local files exist |
| HTML validation | Not run yet | — |
| Mobile and desktop layouts | Final checks pending | — |
| Keyboard navigation | Not tested yet | — |
| Form and GitHub behaviour | Browser tests pending | — |
| Lighthouse | Not run yet | — |

The code checks above were made on 22 September 2026 using local `main` at `8a489c8`.

## Before submission

- [ ] Add the live website and Figma links to the README.
- [ ] Add a homepage screenshot and complete the image credits.
- [ ] Review the design notes, decision log and AI-use disclosure.
- [ ] Finish the Figma wireframes, design system, mobile and desktop layouts, and clickable flow.
- [ ] Check the required pull requests and their descriptions. Separate branches alone do not meet the pull-request requirement.
- [ ] Make sure the final website is on `main` and submit the required links in Classroom.
- [ ] Practise explaining the code and making a small change without assistance.

The brief gives 15 September 2026 at 11:59pm as the deadline. Any agreed extension or revised submission instructions still need to be recorded.
