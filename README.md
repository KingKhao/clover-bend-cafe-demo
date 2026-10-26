# Clover Bend Café

A fictional comfort-food restaurant website for Clinch Valley Digital's example portfolio. Built October 26, 2026. Only the restaurant prompt was implemented; the auto-repair prompt and Morristown Games remain separate work.

## Preview in five lines
1. Open `index.html` in Chrome, Edge, Firefox or Safari; no installation or build is needed.
2. Or, from this folder, run `python -m http.server 43829 --bind 127.0.0.1`.
3. Open `http://127.0.0.1:43829/` while that local server is running.
4. Try the menu tabs, add dishes, open the ticket and complete the sample pickup flow.
5. Try catering, a gift card and the specials list with fictional details; nothing is sent, saved or charged.

## What is included

| Restaurant problem | Demonstrated feature |
|---|---|
| 1. Unreadable or outdated PDF menu | Five keyboard-accessible menu tabs, clear prices and a photographed house favorite |
| 2. Confusing opening hours | One consistent Eastern-time schedule, current open/closed indicator, Monday closure and weekend supper hours |
| 3. Missed takeout calls | In-memory cart, quantities, live printed ticket, illustrative totals, valid pickup slots and animated confirmation |
| 4. Buried Facebook specials | Chalkboard centerpiece with add buttons and an animated sold-out state |
| 5. No catering inquiry path | Event type, future date, guest count, menu, contact fields and a mock confirmation |
| 6. Hard to find for newcomers | Legible visit section, town and address, illustrated map, parking and arrival information; all explicitly fictional |
| 7. Dietary questions by phone | V/GF/heat labels and dish-specific common-allergen notes with cross-contact clarification |
| 8. No gift cards outside the café | $25–$100 selection and a send-to-friend preview, with no payment processing |
| 9. Scattered reviews | An owned review section with manually browsable, clearly labeled fictional sample reviews |
| 10. No repeat-customer channel | Specials/news signup preview with preference checkboxes and an explicit no-subscription confirmation |

## Demo boundaries

No backend, external scripts, APIs, analytics, cookies, persistent browser storage, actual orders, reservations, emails or payments. Contact forms prevent submission. Cart data exists only in the page's memory and clears on reload. Closed form fields are reset. User input shown in confirmations is escaped. Only optional agency and photo-credit links navigate externally when clicked.

The café, owners, street address, recipes, prices and reviews are invented. Photos illustrate the concept and do not depict a real Clover Bend location. The illustrative 9.75% tax is not a verified business tax rate. No actual local-search ranking or business listing is claimed: `noindex,nofollow` is intentional for a fictional demo. A client implementation needs verified business details and its own real operational integrations.

## Files and customization

- `index.html`: page content, accessible structure and modal shells.
- `styles.css` / `polish.css`: responsive layout, local fonts, stationery treatment and motion.
- `menu-data.js`: the 15 sample dishes, integer-cent prices, dietary labels and allergens.
- `app.js`: tabs, cart, time-zone-aware pickup slots, dialogs and mock forms.
- `assets/`: local WebP photographs, favicon, fonts and font license notices.
- `RESEARCH.md`: primary references, asset provenance and rationale.
- `DESIGN-REVIEW.md`: visual QA and intentional style allowances.
- `qa.cjs` / `final-check.cjs`: repeatable Playwright CLI user-flow checks.
- `qa-results.txt` / `qa-final-results.txt`: test results and executed scripts.

No dependencies, package manager or account needed. Edit menu data in its one file; edit the single `hours()` function in `app.js` if changing service hours, then update the visible hours and FAQ to match. Current demo schedule: Monday closed, Tuesday–Thursday 7–2, Friday–Saturday 7–8, Sunday 8–2, all Eastern. Breakfast all day. Pickup leaves at least 30 minutes from generation and stops 15 minutes before close.

## Validation

32 browser assertions pass across the two supplied test scripts: category switching and keyboard arrows; sold-out controls; cart math; quantities; takeout, catering and gift confirmations; safe user text; signup reset; pause/reduced-motion; mobile navigation; dialog Escape; no third-party requests; no JS errors; direct file opening; and 320/390/768/1024/1440px overflow checks. Time tests include a closed Monday, Friday closing, and the November 2026 DST fallback.

Desktop, tablet and phone layouts were visually reviewed. Automated style measurements passed with documented allowances for the physical printed-paper direction. This is not a claim of complete accessibility certification or physical-device performance testing. Test on actual phones before turning the concept into a real restaurant's site.

Published October 26, 2026:

- Public demo: https://clover-bend-cafe-demo.vercel.app/
- Private source repository: https://github.com/KingKhao/clover-bend-cafe-demo
- Vercel project: https://vercel.com/wkb-projects/clover-bend-cafe-demo

The Vercel project is connected to the GitHub repository. Pushes to `main` deploy the site. `.vercelignore` excludes development scripts, reports and documentation from the public static output. The deployment was verified with HTTP 200, `noindex, nofollow`, a 404 for the development QA script, and all 24 functional browser checks against the production URL.
