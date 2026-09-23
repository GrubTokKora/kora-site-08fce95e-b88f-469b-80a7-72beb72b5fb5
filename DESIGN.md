<!-- Design decision record for Jacob Paul Construction.
     Redesigned against the client-supplied reference: https://newtownkitchenbath.com/ -->

# DESIGN.md — Jacob Paul Construction

stylesheet: assets/site.css
script: js/site.js
archetype: industrial-craft
reference: https://newtownkitchenbath.com/ (client-supplied)
interaction_level: L3

positioning: kitchen & bath remodeling specialist (NOT general contracting)

rationale: >
  The client picked Newtown Kitchen & Bath as the target — and the business is itself a
  kitchen and bath remodeler, so the reference is a direct peer rather than a loose analogy.
  That site's DNA: a chunky slab-serif display face (Arvo) over a humanist sans body
  (Source Sans), a single hi-vis amber brand colour used as a gradient on every CTA,
  generous white ground broken by #f5f5f5 tint bands, centered uppercase wide-tracked
  section titles under a short amber rule, and white lift-cards whose outlined buttons fill
  with amber on hover.
  Amber + charcoal keeps the work reading as trade craft rather than interior-design
  boutique, which is the right register for a builder who is actually swinging the hammer;
  the finished-room photography supplies all the warmth the palette deliberately withholds.
  Navy was dropped entirely — the reference has none.

voice: >
  Specialist, not generalist. Two rooms, done properly. The copy uses real trade vocabulary
  a remodeler would say out loud — allowances, selections, rough-in, trim-out, punch list,
  zip walls, templating, curbless, work triangle — and leans on the operational promises
  homeowners actually worry about: dust control, daily clean-up, the estimate matching the
  invoice, and change orders written up before the work proceeds. No "state-of-the-art",
  no "dream space", no "transform your home" boilerplate.

personality: [reliable, skilled, straightforward, professional, approachable]

typography:
  display: "Arvo"          # 400 / 700 — slab serif
  body: "Source Sans 3"    # 300 / 400 / 600 / 700
  scale: 1.25
  notes: >
    Arvo carries every heading, button, eyebrow, nav brand mark and numeral.
    Hero h1 clamp(2.3rem, 6.4vw, 4.3rem) / 700, tracked −0.02em, second line in amber.
    Section titles are UPPERCASE, clamp(1.4rem, 2.9vw, 2rem) / 700, tracked 0.14em — the
    reference's signature treatment — with a 92×4px amber gradient rule beneath.
    A `.sec-title--plain` modifier drops the tracking for sentence-case headings
    (welcome card, CTA band, about split).
    Eyebrows: Arvo 700, 0.72rem, tracked 0.28em, uppercase, amber.
    Buttons: Arvo 700, 0.8rem, tracked 0.15em, uppercase.
    Body: Source Sans 3, 1.0625rem / 1.7 in #4a5058; leads in #6d747d.

palette:
  amber: "#e68a00"          # primary brand / CTA
  amber_light: "#ffb700"    # gradient partner, on-dark accent
  amber_dark: "#c46f00"     # hover + link text on white
  amber_soft: "#fff6e6"     # feature chips, today-row highlight
  ink: "#23282f"            # headings, info card ground
  ink_deep: "#16191e"       # topbar, hero scrim, testimonial ground
  text: "#4a5058"
  text_mid: "#6d747d"
  text_soft: "#8b9199"
  tint: "#f5f5f5"           # alternating section bands, footer ground
  tint_2: "#fafafa"          # input fills
  line: "#e4e6e9"
  application: >
    Amber only ever appears as the 135° gradient #ffb700 → #e68a00 on fills (buttons, pill
    links, card top rules, step markers, badges) and flat #e68a00 on rules, bullets and
    icons. Charcoal #23282f is heading ink and the contact info card. #16191e is the
    utility topbar and the testimonial ground. Sections alternate white / #f5f5f5.
    Green #1e9e5a only for the live "Open now" badge; red #c0392b only for form errors.

composition:
  whitespace: generous (--sec-pad clamp 64–112px)
  container: 1220px, gutter clamp(18px, 4vw, 34px)
  photography: full-bleed kitchen/bath hero slider + 4-col finished-room gallery mosaic
  card_usage: heavy (services, gallery, FAQ, form, hours) — matches the reference
  mobile: >
    Topbar collapses to phone + hours only, then centers. Header drops the nav and quote
    button for a burger at 980px; drawer slides in from the right with section links, two
    CTAs and the NAP block. Hero switches from fixed 92svh to intrinsic height so long
    copy never clips; dots move bottom-left. Services/gallery/steps/footer all restack;
    the gallery drops from 4 → 3 → 2 → 1 columns and cancels its span modifiers at 460px.

shell:
  topbar: >
    #16191e, 40px, MOBILE ONLY — hidden from 981px up, where the header CTA and footer already
    carry the phone and hours. Left: phone + hours with amber icons. Right: service-area line
    and an amber gradient "CT Licensed & Insured" chip; that group hides ≤860px, and the hours
    drop ≤350px so the phone keeps one line. The height stays fixed at 40px because the mobile
    hero's height calculation subtracts it.
  header: >
    Solid white, sticky, 88px → 72px on scroll with a soft shadow at >12px.
    Left: amber gradient rounded-square mark (house/frame glyph) + "Jacob Paul" /
    "CONSTRUCTION" lockup; the mark tilts −5° on hover.
    Center-right: 7 nav links, Source Sans 600, with an amber underline that scales in from
    the left and an IntersectionObserver scroll-spy active state.
    Right: a single solid amber quote CTA. The reference's grey icon-squares were tried and
    removed at the client's request — call, Facebook and Instagram now live in the mobile
    drawer and the footer only.
  footer: >
    #f5f5f5 ground, four columns: brand lockup + blurb + rating + socials; Explore links
    with amber diamond bullets; Services as amber gradient pill buttons (the reference's
    signature footer element); Get in touch with icon rows. Bottom bar carries the
    copyright, licence number and service line, and hosts the Kora branding chip.

pages:
  - slug: index
    title: "Jacob Paul Construction – Kitchen & Bath Remodeling in Danbury, CT"
    description: "Kitchen and bathroom remodeling in Danbury, CT. Custom cabinetry, countertops, tile and stone, and full gut renovations across Fairfield County. Free estimates."
    intent: "Primary conversion page — request a free estimate"
    takes: [hero, welcome, services, cta, about, process, gallery, reviews, areas, faq, contact]

sections:
  - id: hero
    layout: full-bleed-slider
    spec: >
      clamp(600px, 92svh, 900px). Three crossfading slides (1.4s) with a 9s Ken Burns
      push — finished kitchen, finished bath, finished kitchen. Dual scrims: bottom-up +
      left-to-right. Content bottom-left — amber-dashed kicker, h1 carrying the keyword and
      the tagline ("Kitchen & bath remodeling, built to last."), lead, outlined-amber +
      ghost-white CTAs. (A trust row sat here originally and was removed — the same three
      facts carry in the stats band, about section and footer.) Circular blurred arrows and
      a 6px amber gradient rule closing the section. Auto-advances every 6.5s, pauses only
      when the tab is hidden, swipeable.
      Controls are mutually exclusive: arrows above 680px, centred dots at 680px and below
      (where the arrows would sit on top of the full-width CTAs). Never both.

  - id: welcome
    layout: centered-card + stats
    spec: >
      #f5f5f5 card with a 5px amber left rule, Arvo 400 welcome line, supporting paragraph.
      Below: four counters (15+ / 400+ / 4.8 / 100%) that animate on entry with hairline
      dividers between them.

  - id: services
    layout: card-grid (auto-fit, min 310px)
    spec: >
      Tint band. Six white cards: 4:3 image with a bottom gradient and an amber 01–06 tab,
      centered body, diamond bullet list, outlined-amber "Learn More". Hover: −8px lift,
      deep shadow, 1.09 image zoom, amber top rule scales in, title goes amber, button fills.
      Order is deliberate: Kitchen and Bathroom lead, then the trades a kitchen/bath job
      actually needs — cabinetry & countertops, tile & stone, trim & finish carpentry,
      plumbing/lighting/fixtures.

  - id: cta
    layout: centered band
    spec: White ground, sentence-case slab heading, outlined + solid amber CTAs.

  - id: about
    layout: split-visual
    spec: >
      Tint band. Left: portrait image over an offset amber-outlined block, with a white
      licence card (5px amber rule) overlapping the bottom-left. Right: eyebrow, plain
      section title + left-aligned rule, two paragraphs, four amber-check feature chips
      that lift and warm to #fff6e6 on hover.

  - id: process
    layout: 4-step timeline
    spec: >
      White ground. Consultation → selections & estimate → demo & build → walkthrough &
      warranty: the four beats of a remodel, with "selections" called out because cabinetry,
      stone and tile lead times are what actually drive a kitchen schedule. Dashed connector
      behind four outlined amber numerals that fill, lift and glow on hover. Connector hides
      below 980px where the grid goes 2-up; steps stack fully below 560px.

  - id: gallery
    layout: 4-col mosaic
    spec: >
      Tint band. Eight tiles on 210px rows with two `--tall` and two `--wide` spans — the
      span pattern fills the 4-column grid with no holes. Every tile is a finished kitchen,
      bath or powder room. Hover: 1.08 zoom, dark bottom scrim fades in, caption (room type
      + amber town label) slides up.

  - id: reviews
    layout: photo-ground carousel
    spec: >
      Full-bleed photo under a dark left-to-right gradient. Rating pill, then a frosted
      white card (backdrop-blur) with an amber quote glyph, stars, italic quote, divider,
      avatar + name + job/town. Four reviews, arrows + dots below, auto-advance 8s — paused
      only while the pointer is over the quote card itself, so a review can be read to the end.

  - id: areas
    layout: chip row
    spec: Seven pin chips; hover fills amber gradient and lifts.

  - id: faq
    layout: accordion
    spec: >
      Tint band, max 900px. White bordered items; open item gets an amber border and
      shadow, and its "+" square rotates 135° into an amber gradient "×". First open.

  - id: contact
    layout: split-form
    spec: >
      Left: white card with an amber gradient top border — name/phone, email, service and
      timeline selects, details textarea, reCAPTCHA, error region, full-width amber submit.
      Posts JSON to {apiBaseUrl}/api/v1/public/forms/submit, then swaps to a success panel.
      Right: charcoal info card (address / phone / email) + white hours card with a live
      open-closed pill and today's row highlighted amber. Full-width map below with an
      amber top rule and a light grayscale filter.

motion:
  - carousel autoplay pauses ONLY over the element worth reading (the quote card). Binding
    it to a full-bleed section means a cursor resting anywhere on screen stops it for good,
    because the pointer never leaves to fire mouseleave — that bug shipped once already.
  - IntersectionObserver reveals: 26px rise + fade, 0.75s, staggered 90ms via data-reveal-delay
  - hero Ken Burns 1.02 → 1.12 over 9s, crossfade 1.4s
  - counters ease-out-cubic over 1.4s on first view
  - buttons: 0.6s specular sweep via ::after, −3px lift, gradient reversal
  - cards: −8px lift, 0.8s image zoom, amber rule scale-in
  - nav underline scaleX from left; scroll-spy sets the active link
  - back-to-top fades in past 520px
  - every one of the above is cancelled under prefers-reduced-motion, and the hero and
    testimonial autoplay never start

avoid:
  - navy/slate as a brand colour — the reference has none and it fights the amber
  - purple-on-white or purple-to-indigo AI default themes
  - warm cream + terracotta editorial cliche
  - inset or carded hero images — the hero must stay full-bleed
  - stats strips or promo chips overlaid on hero media (the trust row is type only)
  - inventing contact details beyond the known address, phone, and email
  - construction cliches ("state-of-the-art", "cutting-edge", "turnkey solutions")
  - generic construction-site stock (cranes, rebar, hi-vis crews) — every image is a
    finished kitchen, bath, or remodel detail
  - positioning the business as a general contractor; kitchens and baths lead everywhere
  - loading conflicting legacy stylesheets that override assets/site.css

assets:
  stylesheet_live: assets/site.css
  stylesheet_alias: assets/styles.css
  script: js/site.js
  tokens_source: src/input.css
