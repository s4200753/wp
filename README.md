# BookVerse — Online Bookstore Platform

COSC2446 Web Programming A — Assessment 1 (Static Website & Demonstration)

## Project overview
<!-- 2–3 sentences in your own words: what BookVerse is, and that this is the
static, stage-one build (home, browse, gallery, add-book form). -->

## Live site
- URL: `https://jupiter.csit.rmit.edu.au/~sXXXXXXX/wp/a1` <!-- replace with your real student ID and server -->

## Structure
```
a1/
├── index.html            Home — hero carousel + featured books grid
├── books.html             All books — filterable table (Available/Reserved/Sold)
├── gallery.html            Cover gallery grid + shared modal (Prev/Next)
├── add.html                 Add-a-book form
├── assets/
│   ├── css/style.css          Single custom stylesheet (brand colours as CSS variables)
│   ├── js/scripts.js           Single custom script (modal, filter, validation)
│   └── images/
│       ├── favicon.svg
│       └── covers/               1.png – 12.png, supplied book cover art
├── process-evidence.md
└── README.md
```

## Technologies used
- HTML5 — semantic `header` / `nav` / `main` / `footer` on every page
- CSS3 — custom properties for the brand palette, no inline styles
- Bootstrap 5.3 — navbar, carousel, grid, modal, form validation states
- Vanilla JavaScript — DOM events, `FileReader`, Bootstrap's JS API
- Google Fonts — Righteous (headings), Elms Sans (body)
- Material Icons

## Coding choices
<!-- Write this yourself once you've actually gone through the code — you'll
need to explain it live in the demo anyway. Things worth covering:
- why the palette lives in CSS variables (:root) instead of hard-coded colours
- why one shared #imageModal is reused on both gallery.html and index.html
  instead of one modal per image
- why the status filter on books.html toggles a `d-none` class off `data-status`
  rows instead of rebuilding the table
- why FileReader + a change listener drives the image preview on add.html -->

## Testing
<!-- Browsers/screen sizes tested. W3C HTML validator (https://validator.w3.org/)
and CSS validator (https://jigsaw.w3.org/css-validator/) results, and what you
fixed. Do this for real before submitting — don't skip it. -->

## Deployment
<!-- Steps taken to deploy to the Coreteaching server (Jupiter/Saturn/Titan),
and confirmation that .htaccess sits in public_html, not inside a1. -->

## Git process
<!-- Describe your actual commit habits — must match your real GitHub history.
Assessment requires 5+ meaningful commits across 5+ different calendar days,
with no single day over 50% of commits, or a penalty of up to 50% applies to
the GitHub criterion. -->

## AI-use declaration
This project was developed with assistance from Claude (Anthropic) for
scaffolding HTML/CSS/JS structure, matched against the supplied reference
screenshots and colour/typography spec. All code was reviewed, tested, and
must be explained by the student during the demonstration. Detailed records
are in `process-evidence.md`.

## Known limitations
- Static site only — the add-book form does not persist data (no backend).
- Book data (titles/authors/prices/status) is hard-coded to match the
  reference screenshots supplied with the brief.
