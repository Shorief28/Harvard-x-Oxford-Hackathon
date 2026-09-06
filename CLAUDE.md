# Harvard × Oxford Hackathon — project notes

Static site for a joint Harvard and Oxford healthcare hackathon, run by
Students for Global Health Oxford and Harvard VISION Global Health Society.
Four HTML pages, one stylesheet, one script. No build step, no framework, no
package manager. Do not introduce any.

This site is deliberately separate from the Students for Global Health Oxford
site. It shares no code with it. Do not merge them.

## Files

- `index.html` — the long scrolling overview
- `participate.html` — participant sign-up form
- `mentor.html` — judge and mentor sign-up form
- `sponsor.html` — sponsorship enquiry form
- `assets/hack.css` — all styling; design tokens in `:root` at the top
- `assets/hack.js` — mobile menu, form submission, scroll reveal.
  Progressive enhancement only.

## Hard constraints

These are not preferences. Check each one before finishing a change.

1. **Contrast.** Every text/background pair must meet WCAG AA (4.5:1 for body
   text, 3:1 for large text, meaningful graphics and form control borders).
   `--lime` (#C1E328) is a DARK-BACKGROUND colour only — on white it is 1.5:1
   and must never be used for text there. Use `--ink` for text on lime. If you
   change any colour, state the new contrast ratio in your reply.
2. **One `<h1>` per page.** Never skip heading levels.
3. **Real labels.** Every input needs a `<label for="...">`. Placeholder text is
   never a substitute for a label.
4. **The site must work with JavaScript disabled.** Nothing in `hack.js` may
   become load-bearing for reading content, navigating or submitting a form.
   With JS off the forms post to Google directly and Google shows its own
   confirmation page.
5. **Reduced motion.** Any new animation must be disabled inside the existing
   `@media (prefers-reduced-motion: reduce)` block.
6. **Touch targets** stay at least 44×44px.
7. **`aria-current="page"`** on the nav link for the current page.
8. **Version the asset links.** Bump `?v=` on the `hack.css` and `hack.js`
   links in all four pages whenever either file changes, or returning visitors
   keep the cached copy.

## The forms

Each form posts straight to a Google Form, so answers land in that form's
response sheet. Every field `name` is the `entry.NNNN` id of the matching
question. If a question is added, removed or reordered in Google Forms, update
the matching field here or that answer is dropped silently. To find the ids:
open the live form, view source, search for `entry.`.

For multiple choice, the `value` must match the Google Form's option text
character for character — em dashes and currency symbols included — or Google
rejects the answer.

## Conventions

- British English throughout ("organise", "programme").
- Sentence case for headings and buttons. Buttons name the action that happens.
- The header and footer are duplicated across all four pages. If you change one,
  change all four and say so.
- Cards in a grid use `subgrid` so their contents line up row by row at any
  width. The row span equals the number of direct children — change the markup,
  change the span.
- Keep the markup plain and readable. A committee member with no coding
  background should be able to edit an event or add a sponsor logo by hand.

## Content that is still placeholder

Do not present these as facts; flag them if a task touches them.

- The exact February 2027 dates and the venue — both marked "to be confirmed"
- Whether the sponsor wall should show tier labels beside each logo

## Checking work

Open the page in a browser and check the change at a narrow width (~380px) as
well as full width. Run Lighthouse's accessibility audit before any commit that
touches markup or colour.
