# Site index · format 2
Structure and the names of what each page offers. Values that change often — prices, hours, phone,
address — and body copy are deliberately not recorded here; read the page itself for those.

Design system: craft-trusted (stylesheet `assets/site.css`; `assets/styles.css` imports it).

## index.html → /
title: Jacob Paul Construction – Licensed General Contractor in Danbury, CT
purpose: Home page — company introduction, services, reviews, FAQ, hours/location, and quote request.
sections:
- `#siteHeader` — fixed transparent→scrolled header
- `.mobile-menu` — mobile overlay panel
- `.hero` — full-viewport full-bleed hero
- `#about` — about split with team photo
- `#services` — six service cards
- `#reviews` — rating summary and review cards
- `#faq` — accordion FAQs
- `#contact` — quote request form, visit details, hours, map
- `.site-footer` — brand, Explore, Services, Get in touch
also: LocalBusiness and FAQPage JSON-LD in the document head.
also: Live styles from `assets/site.css` only.

## support files
- `assets/site.css` — [content] live site stylesheet
- `assets/styles.css` — imports `site.css` for link compatibility
- `src/input.css` — Tailwind source; theme tokens match the live brand
- `DESIGN.md` — [content] design decision record
- `llms.txt` / `robots.txt` / `sitemap.xml` — discovery and crawl files

## shared
Single-page site. Header, mobile menu, and footer are defined on index.html and styled by
`assets/site.css`.
