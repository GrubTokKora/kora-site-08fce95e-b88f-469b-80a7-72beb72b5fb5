# Site index · format 2
Structure and the names of what each page offers. Values that change often — prices, hours, phone,
address — and body copy are deliberately not recorded here; read the page itself for those.

Design system: industrial-craft (stylesheet `assets/site.css`; `assets/styles.css` imports it;
behaviour in `js/site.js`). Redesigned against the client-supplied reference
newtownkitchenbath.com — Arvo slab display, Source Sans 3 body, amber gradient CTAs.
Positioning: kitchen & bath remodeling specialist (not general contracting).

## index.html → /
title: Jacob Paul Construction – Licensed General Contractor in Danbury, CT
purpose: Home page — kitchen & bath remodeling introduction, services, process, gallery, reviews, FAQ, hours/location, and quote request.
sections:
- `.topbar` — dark utility strip: phone, hours, service area
- `#siteHeader` — solid white sticky header, shrinks on scroll; nav, social icon squares, quote CTA
- `#drawer` — right-side mobile drawer
- `#hero` — full-bleed three-slide kitchen/bath hero carousel with trust row
- `#welcome` — welcome card and four animated stat counters
- `#services` — six kitchen & bath service cards with image zoom and fill-on-hover buttons
- `#cta` — mid-page call-to-action band
- `#about` — about split with offset image frame
- `#process` — four-step remodel process timeline (consultation, selections, demo & build, walkthrough)
- `#gallery` — eight-tile kitchen & bath mosaic with accessible lightbox modal and hover captions
- `#reviews` — testimonial carousel on a full-bleed kitchen photo ground
- `#areas` — service-area chips
- `#faq` — accordion FAQs
- `#contact` — quote form (posts to the Kora forms API), info card, hours card, map
- `.site-footer` — brand, Explore, Services pill links, Get in touch, bottom bar
- `#toTop` — back-to-top button
also: GeneralContractor/LocalBusiness JSON-LD with aggregateRating and four reviews, plus FAQPage JSON-LD, in the document head.
also: Live styles from `assets/site.css` only.

## support files
- `assets/site.css` — [content] live site stylesheet
- `js/site.js` — [content] header, drawer, carousels, accordion, reveals, counters, hours, form
- `assets/styles.css` — imports `site.css` for link compatibility
- `src/input.css` — Tailwind source; theme tokens match the live brand
- `DESIGN.md` — [content] design decision record
- `llms.txt` / `robots.txt` / `sitemap.xml` — discovery and crawl files

## shared
Single-page site. Topbar, header, drawer, and footer are rendered statically into index.html
and styled by `assets/site.css`.
