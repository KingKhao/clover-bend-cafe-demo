# Visual review — October 26, 2026

ROUND 1

Seen in one second: a warm café, pancakes and a large cream menu-paper invitation.
Idea (one sentence): bring the café's printed objects to life instead of treating every section as a marketing card.
Live thing: the menu, order ticket and local-time opening state.
Layout words by section: hero=menu invitation over food / specials=framed board / menu=photograph and price list / takeout=counter ticket / catering=pie and invitation / story=letter and photograph / gifts=stationery / reviews=sample quote / regulars=coffee and signup / visit=hours and illustration / FAQ=accordion / footer=large closing wordmark.
Scores: design 6.5 · usability 7 · creativity 7 · content 8 → arithmetic 6.95; strict style cap 6.5.
Caps applied: physical-object outlines, dividers and resting paper shadows intentionally conflict with Taste's universal no-outline/no-shadow rubric. This is not an awards score.
Top three problems:
1. The sample-ticket note was too pale on cream (tablet-page-01). Fixed with brown supporting text.
2. Mobile menu tabs extended sideways; supporting type was too small (mobile-page-01). Wrapped tabs and raised supporting text.
3. The tablet review title wrapped to three lines. Replaced it with “Worth sharing.” and reduced quotation size.

ROUND 2

Seen in one second: food leads, two actions are immediately recognizable.
Idea (one sentence): the invitation, menu sheet and takeout pad share the same café material language.
Live thing: added dishes now animate into the page's printed takeout ticket; pickup times observe Eastern service hours.
Layout words by section: unchanged from round 1; tablet and mobile stacks preserve reading order.
Scores: design 7 · usability 8 · creativity 7 · content 8 → arithmetic 7.4; strict style cap 6.5.
Caps applied: intentionally retained paper shadows and physical-object rules.
Top three problems:
1. The mobile hero photo credit overlapped the headline after text sizing changes (mobile-fold). Moved the credit into normal flow after the paper, away from both the food and title.
2. Quantity controls and allergy links were smaller than the desired touch targets. Raised them to at least 44px.
3. Mixed mobile font overrides reintroduced small captions. Added final mobile text overrides and verified the rendered title/credit separation.

ROUND 3 — final

Seen in one second: a Tennessee café concept selling breakfast through food and typography.
Idea (one sentence): let people use the menu, chalkboard and order pad as physical café artifacts.
Live thing: interactive category menu, animated chalk mark, live ticket rows, bounded cart, valid pickup selection, and confirmations.
Layout words by section: same purposeful objects; no new unrelated section system introduced.
Scores: design 7 · usability 8 · creativity 7 · content 8 → arithmetic 7.4; strict style cap **6.5**, below the skill's 7.5 gallery threshold. Not rounded up.
Caps applied: deliberate paper shadows, menu rules and stationery outlines. The user brief and drawn physical-object direction justify retaining these; the result is not represented as an award-winning finished client site.
Remaining limitations: the pie image is evocative but does not illustrate every sample menu dish; lunch and dinner use a diner scene rather than fabricated plated food. The map and reviews are explicit samples. No physical-phone performance measurement was performed. Real client food photography and verified operational content would be the strongest next improvements, rather than adding more effects.

## Inspection allowances

Final automated inspection: 0 failures with these explicit, bounded visual allowances:
- `eyebrow`: a café name printed on a chalkboard/gift card and explicit demo context in transactional dialogs, not generic marketing labels.
- `shadow` / `outlined-box`: physical paper, Polaroid-style photo, board frame, gift card and native dialog treatments. No unrelated decorative card grid.
- `hairline`: menu prices, receipt lines, hours rows, form fields and sticky navigation separation.
- `covered-text`: the automated scroll sampler flags ordinary content passing behind the fixed opaque header. Manual review checked that no positioned artwork covers section headings. The separate actual mobile photo-credit overlap was fixed and tested.

Warnings defended: warm cream was explicitly requested; receipt/chalk rules support the physical-object idea; no video preserves a small offline package; variation in type sizes includes native label/badge/form and display scales. Display headings consistently use Imbue; quote attribution uses Albert Sans. Diet badges are 13px in the final build.

Reviewed final desktop, tablet and mobile folds and all contact-sheet page captures in `.taste-skill/inspect-final/`, then the corrected mobile hero and order dialog screenshots under the adjacent outputs folder. Source QA results record 32 passing assertions. No claim of comprehensive accessibility, security or conversion certification.
