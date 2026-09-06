# Harvard × Oxford Hackathon

Four plain HTML pages, one stylesheet, one small script. No build step, no
framework, no database. Open any `.html` file in a browser to preview it.

```
index.html         The overview — mission, aims, challenges, structure,
                   sponsorship tiers, sponsors, organisers
participate.html   Participant sign-up form
mentor.html        Judge and mentor sign-up form
sponsor.html       Sponsorship enquiry form
assets/hack.css    All styling — colours and type live at the top
assets/hack.js     Mobile menu, form submission, scroll reveal
```

This site is separate from the Students for Global Health Oxford site and
shares no code with it. Either can be edited without touching the other.

## Editing

**Content** — open the page in a text editor (VS Code with the "Live Preview"
extension is the easiest). Everything you would want to change is plain English
between tags.

**Colours and fonts** — the `:root` block at the top of `assets/hack.css`.
Change a value there and it updates every page.

**Navigation** — the header and footer are duplicated in all four pages. If you
add a page, add the link in all four.

**After editing `hack.css` or `hack.js`** — bump the `?v=` number on the
`<link>` and `<script>` in all four pages. Without it, anyone who has visited
before keeps the old cached copy and will not see your change.

**Adding a sponsor logo** — in the "Our sponsors" section of `index.html`,
replace a placeholder `<span>Your logo here</span>` with
`<img src="assets/logos/their-logo.svg" alt="Company name">` and put the file in
`assets/logos/`. Delete any placeholder slots left over. There is a comment
above that section with the same instructions.

## How the three forms work

The sign-up pages are ordinary HTML forms that post straight to Google Forms,
so answers land in a Google Sheet and nobody has to leave the site. There is no
server and no database.

Each field's `name` is the `entry.NNNN` id of the matching question in the
Google Form. **If you add, remove or reorder a question in Google Forms, the
matching field here must be updated or that answer will be dropped silently.**
To find the ids: open the live form, view the page source, and search for
`entry.` — they appear in question order.

For multiple-choice questions the `value` of each option here must match the
Google Form's option text character for character, em dashes and currency
symbols included, or Google drops that answer.

With JavaScript switched off the forms still submit; Google shows its own
confirmation page instead of the on-page thank-you.

### Getting told about new sign-ups

Google Forms does not email you by default. For **each** of the three forms:
Responses tab → three-dot menu → "Get email notifications for new responses".
Do this once per form, per person who needs to know.

## Accessibility

Built to WCAG 2.2 AA. Things to preserve if you edit:

- Every colour pair in `:root` meets AA contrast. The bright lime `--lime` is a
  dark-background colour **only** — on white it is 1.5:1. Use `--ink` for text
  on lime. Check changes at webaim.org/resources/contrastchecker
- Each page has exactly one `<h1>`. Don't skip heading levels (h2 → h4)
- Every form control has a real `<label>`. Never replace a label with
  placeholder text
- The nav link for the current page carries `aria-current="page"`
- Links and buttons are at least 44px tall
- All animation is disabled automatically for anyone using "reduce motion" in
  their OS settings
- The whole site works with JavaScript switched off, forms included

Worth running before you publish: WAVE (wave.webaim.org) and Lighthouse
(built into Chrome, F12 → Lighthouse → Accessibility).

## Publishing

1. Drag this whole folder onto app.netlify.com/drop — it goes live immediately.
2. Or push it to GitHub and turn on GitHub Pages, which redeploys automatically
   whenever someone edits a file.

`index.html` must stay at the top level and keep that name.

## Before it goes live

- [ ] Confirm the exact February 2027 dates and the venue, then replace the
      "to be confirmed" lines in the hero and the footer of all four pages
- [ ] The participant Google Form's description still promises confirmation
      "by August 28th 2026", left over from the earlier October 2026 plan
- [ ] Check AMBOSS and Oxford Global Health are happy with how their logos are
      shown, and whether either should carry a tier label
- [ ] Delete the three rows labelled "TEST SUBMISSION - please delete" — one in
      each of the participant, judge and sponsorship response sheets
- [ ] Switch on email notifications for all three forms (see above)
- [ ] The sponsorship Google Form is still called "Untitled form" — give it a
      name, or that is what appears on the response sheet and the notifications
- [ ] "Work email" is optional in the sponsorship Google Form but required on
      the website page. That is deliberate, but make the form match if you would
      rather it were enforced everywhere
- [ ] Replace the "Your logo here" placeholders as sponsors confirm
- [ ] Check both universities' rules before adding either crest or wordmark —
      the pages currently use plain text, not the official marks
