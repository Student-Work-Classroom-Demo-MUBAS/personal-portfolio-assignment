# Decision log

This draft records decisions visible in the current code. Alternatives, reasons and trade-offs are retrospective explanations for the author to review, not a claim that these options were documented or evaluated at the time. Replace any rationale that does not reflect your thinking and add genuine dates or supporting commits where known.

| # | Decision reflected in the implementation | Alternative | Rationale to confirm | Trade-off |
| --- | --- | --- | --- | --- |
| 1 | Use separate Home, About, Projects and Article pages | One long scrolling page | Give each content type a focused URL and keep the homepage concise | Navigation and shared markup must remain consistent across files |
| 2 | Use plain HTML, CSS and JavaScript | A frontend framework | Match the assignment and keep browser behaviour directly explainable | Shared components are copied manually; larger changes require more coordination |
| 3 | Share one stylesheet and one JavaScript file | Separate assets for every page | Reuse visual rules and interaction logic throughout the portfolio | Page-specific rules can accumulate and require careful scoping |
| 4 | Switch theme through CSS colour properties and save the preference | A temporary toggle or duplicated theme styles | Keep colours consistent and preserve the visitor's choice between visits | Storage may be unavailable, so persistence needs a fallback; both themes need testing |
| 5 | Use Grid/Flexbox with responsive breakpoints | Fixed-width layouts | Adapt content groups and navigation to different screen widths | More layouts and cascade interactions must be checked; some rules still need mobile-first consolidation |
| 6 | Add JavaScript field validation with inline errors and first-error focus | Browser-only validation | Explain how to correct each input and make errors easier to locate | Custom validation requires maintenance and would not replace server-side checks if delivery is added |
| 7 | Fetch recent public repositories from GitHub using async/await | Hardcoded repository cards | Keep the feed current and demonstrate the required live API integration | Network availability and unauthenticated rate limits affect the feature |
| 8 | Render repository data with DOM nodes and `textContent` | Interpolate API strings into HTML | Treat external descriptions and names as text | More verbose rendering code |
| 9 | Include request timeout, loading status, error handling and retry | Show an empty area until a request succeeds | Make delays and failures understandable and recoverable | Additional state and focus behaviour must be maintained |
| 10 | Use category buttons to filter the project list | Separate category pages | Let visitors narrow the existing list without a page change | Categories must stay accurate and results must be announced accessibly |
| 11 | Use native `details` for the article contents, enhanced with JavaScript | A fully custom collapsible widget | Provide a usable disclosure control before enhancement and adapt it to mobile | Automatic layout changes need testing alongside the reader's interactions |
| 12 | Respect reduced-motion preferences in CSS and article scrolling | Always animate transitions and scrolling | Support readers who prefer less movement | Less motion feedback for those users; state changes must remain visually clear |

## Decisions still pending

- **Hosting:** select and verify the actual platform, deployment URL and base path. Check custom 404 routing there.
- **Form delivery:** choose whether to connect a service; if used, record the provider, reasons, alternatives and trade-offs. The current form does not send messages.
- **Design tokens:** settle the typography and spacing scales and implement shared properties.
- **Project documentation:** choose the first three detailed case studies and record accurate individual contributions and test evidence.

Do not backdate this document or describe proposed work as completed. Be prepared to explain each retained entry using the corresponding HTML, CSS or JavaScript.
