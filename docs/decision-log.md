# Decision log

These notes explain the main choices in the current site and the changes made while improving it.

## HTML, CSS and JavaScript

The site uses plain HTML, CSS and JavaScript. It does not need a build process, and the code for each page can be followed directly. One stylesheet and one script are shared across the site. The downside is that repeated HTML, such as navigation, needs to be kept consistent by hand.

## Separate pages

Home, About, Projects and the article each have their own page. This keeps the homepage focused and gives longer content room of its own. Each project also has a separate page for its explanation and images.

## Light and dark themes

The themes share CSS colour properties instead of duplicating the whole stylesheet. JavaScript saves the visitor's choice when local storage is available. Both themes still need to be checked for readable text and clear controls.

## Contact form

The form uses inline messages to explain missing or invalid input. It also moves focus to the first field that needs attention. There is no delivery service connected, so the page tells visitors to use the email link. A valid form should never suggest that a message was sent when it was not.

## GitHub feed and project filters

The Projects page fetches recent public repositories from GitHub instead of keeping a manually updated list. Loading, empty and error messages explain what is happening, and a retry button lets the visitor try again. Repository names and descriptions are inserted as text rather than HTML.

Category filters let visitors narrow the project list without opening another page. The selected filter and number of matching results are announced for assistive technology.

## Project images

Three project images were converted to WebP with Google's converter. The Cisco and Griffin screenshots used lossless conversion to preserve their detail. The Smart House image used quality 80 for a smaller file.

The images were moved into `assets/images/`, and the HTML paths were updated to match. On the Networking page, I preferred one screenshot at the top, so the illustration and lower image section were removed.

## Simpler project content

I removed the extra labels above the project headings because the headings already describe each section. I also changed the tools from spans to bullet lists, making each item easier to pick out.

## Branch organisation

I wanted the work branches separated by file responsibility. Selected files can be copied from another branch with `git restore --source=...` when a full merge would also bring unwanted file deletions or unrelated changes. This updates the chosen files but does not make the branch histories identical.

## Next decisions

The remaining choices include where to host the site and whether to connect a form service. The Figma file needs to match the final website, and the two shorter project write-ups need accurate implementation details and results.
