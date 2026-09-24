/* Jacob Paul Construction — interaction layer
   Header state, mobile drawer, hero slider, testimonial slider, FAQ accordion,
   scroll reveals, animated counters, opening-hours status, quote form. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CFG = window.KORA_SITE_CONFIG || {};

  /* ---- helpers --------------------------------------------------------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---- sticky header --------------------------------------------------- */
  function initHeader() {
    var header = $('#siteHeader');
    if (!header) return;
    function onScroll() { header.classList.toggle('is-stuck', window.scrollY > 12); }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- mobile drawer --------------------------------------------------- */
  function initDrawer() {
    var burger = $('#burger');
    var drawer = $('#drawer');
    if (!burger || !drawer) return;

    function setOpen(open) {
      document.body.classList.toggle('menu-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    }
    burger.addEventListener('click', function () {
      setOpen(!document.body.classList.contains('menu-open'));
    });
    $$('[data-drawer-close], .drawer__link, .drawer__foot a', drawer).forEach(function (el) {
      el.addEventListener('click', function () { setOpen(false); });
    });
    drawer.addEventListener('click', function (e) { if (e.target === drawer) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 980) setOpen(false); });
  }

  /* ---- generic slider -------------------------------------------------- */
  function makeSlider(opts) {
    var slides = opts.slides, dots = opts.dots || [], i = 0, timer = null, hovering = false;

    function go(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) {
        s.classList.toggle('is-active', k === i);
        s.setAttribute('aria-hidden', k === i ? 'false' : 'true');
      });
      dots.forEach(function (d, k) {
        d.classList.toggle('is-active', k === i);
        d.setAttribute('aria-selected', k === i ? 'true' : 'false');
      });
    }
    function next() { go(i + 1); }
    function prev() { go(i - 1); }
    function play() {
      if (hovering || reduceMotion || slides.length < 2 || !opts.interval) return;
      stop();
      timer = window.setInterval(next, opts.interval);
    }
    function stop() { if (timer) { window.clearInterval(timer); timer = null; } }

    if (opts.next) opts.next.addEventListener('click', function () { next(); play(); });
    if (opts.prev) opts.prev.addEventListener('click', function () { prev(); play(); });
    dots.forEach(function (d, k) {
      d.addEventListener('click', function () { go(k); play(); });
    });
    // Pause on hover only over the thing actually worth reading. Binding this to a
    // full-bleed section would mean a cursor resting anywhere on screen stops autoplay
    // for good, because the pointer never leaves to fire mouseleave.
    if (opts.hoverPause) {
      opts.hoverPause.addEventListener('mouseenter', function () { hovering = true; stop(); });
      opts.hoverPause.addEventListener('mouseleave', function () { hovering = false; play(); });
    }
    if (opts.root) {
      // swipe
      var x0 = null;
      opts.root.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      opts.root.addEventListener('touchend', function (e) {
        if (x0 === null) return;
        var dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 48) { dx < 0 ? next() : prev(); play(); }
        x0 = null;
      });
    }
    document.addEventListener('visibilitychange', function () {
      document.hidden ? stop() : play();
    });

    go(0);
    play();
    return { go: go, next: next, prev: prev };
  }

  function initHero() {
    var root = $('.hero');
    if (!root) return;
    var slides = $$('.hero__slide', root);
    if (!slides.length) return;
    makeSlider({
      root: root,
      slides: slides,
      dots: $$('.hero__dot', root),
      next: $('.hero__arrow--next', root),
      prev: $('.hero__arrow--prev', root),
      interval: 6500
      // no hoverPause: the hero fills the viewport, so hovering it means nothing
    });
  }

  function initQuotes() {
    var root = $('.quotes');
    if (!root) return;
    var slides = $$('.quote', root);
    if (!slides.length) return;
    makeSlider({
      root: root,
      slides: slides,
      dots: $$('.quotes__dot', root),
      next: $('.quotes__arrow--next', root),
      prev: $('.quotes__arrow--prev', root),
      // pause only over the quote card itself, so a review can be read to the end
      hoverPause: $('.quotes__viewport', root),
      interval: 8000
    });
  }

  /* ---- FAQ accordion --------------------------------------------------- */
  function initFaq() {
    var items = $$('.faq');
    items.forEach(function (item) {
      var btn = $('.faq__q', item);
      var panel = $('.faq__a', item);
      if (!btn || !panel) return;
      btn.addEventListener('click', function () {
        var open = item.classList.contains('is-open');
        items.forEach(function (other) {
          other.classList.remove('is-open');
          var b = $('.faq__q', other);
          if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (!open) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ---- gallery: progressive reveal -------------------------------------- */
  function initGallery() {
    var grid = $('#galleryGrid');
    var btn = $('#galleryMore');
    if (!grid || !btn) return;
    var extra = $$('.shot[data-extra]', grid).length;
    if (!extra) { btn.hidden = true; return; }

    function label() {
      var collapsed = grid.classList.contains('is-collapsed');
      btn.textContent = collapsed ? 'View All Projects' : 'Show Fewer';
      btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    }
    label();

    btn.addEventListener('click', function () {
      var nowCollapsed = grid.classList.toggle('is-collapsed');
      label();
      // collapsing can drop the page out from under the reader — put them back at the grid
      if (nowCollapsed) {
        grid.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      }
    });
  }

  /* ---- scroll reveal --------------------------------------------------- */
  function initReveal() {
    var els = $$('[data-reveal]');
    if (!els.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    els.forEach(function (el) {
      var d = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
      if (d) el.style.transitionDelay = d + 'ms';
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) { io.observe(el); });

    // anything already above the fold reveals immediately
    requestAnimationFrame(function () {
      els.forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
          el.classList.add('is-in');
          io.unobserve(el);
        }
      });
    });
  }

  /* ---- animated counters ----------------------------------------------- */
  function initCounters() {
    var nums = $$('[data-count]');
    if (!nums.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      nums.forEach(function (n) { n.textContent = n.getAttribute('data-count') + (n.getAttribute('data-suffix') || ''); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        io.unobserve(el);
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var decimals = (el.getAttribute('data-count').split('.')[1] || '').length;
        var start = null, dur = 1400;
        function tick(ts) {
          if (start === null) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (target * eased).toFixed(decimals) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { io.observe(n); });
  }

  /* ---- opening hours status -------------------------------------------- */
  var HOURS = { 0: null, 1: [420, 1020], 2: [420, 1020], 3: [420, 1020], 4: [420, 1020], 5: [420, 1020], 6: [480, 780] };

  function initHours() {
    var now = new Date();
    var day = now.getDay();
    var mins = now.getHours() * 60 + now.getMinutes();
    var today = HOURS[day];
    var open = !!(today && mins >= today[0] && mins < today[1]);

    document.body.classList.toggle('is-open', open);
    document.body.classList.toggle('is-closed', !open);
    $$('[data-day]').forEach(function (row) {
      row.classList.toggle('is-today', Number(row.getAttribute('data-day')) === day);
    });
  }

  /* ---- scroll spy ------------------------------------------------------ */
  function initSpy() {
    var links = $$('.nav__link[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    var targets = [];
    links.forEach(function (l) {
      var id = l.getAttribute('href').slice(1);
      var sec = document.getElementById(id);
      if (sec) { map[id] = l; targets.push(sec); }
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (l) { l.classList.remove('is-active'); });
        var active = map[e.target.id];
        if (active) active.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* ---- gallery lightbox ------------------------------------------------ */
  function initLightbox() {
    var modal = $('#galleryLightbox');
    if (!modal) return;

    var triggers = $$('.shot');
    if (!triggers.length) return;

    var img = $('#lightboxImg');
    var title = $('#lightboxTitle');
    var sub = $('#lightboxSub');
    var prevBtn = $('#lightboxPrev');
    var nextBtn = $('#lightboxNext');
    var closeButtons = $$('[data-lightbox-close]', modal);
    var currentIndex = 0;
    var lastTrigger = null;

    function getItemsData() {
      return triggers.map(function (btn) {
        var elImg = $('img', btn);
        var elTitle = $('.shot__cap-title', btn);
        var elSub = $('.shot__cap-sub', btn);
        // The grid already serves a 2000px webp and it is in cache by the time the
        // lightbox opens, so reuse it rather than refetching a larger copy.
        var rawSrc = elImg ? elImg.getAttribute('src') : '';
        return {
          src: rawSrc,
          alt: elImg ? elImg.getAttribute('alt') || '' : '',
          title: elTitle ? elTitle.textContent.trim() : '',
          sub: elSub ? elSub.textContent.trim() : ''
        };
      });
    }

    var items = getItemsData();

    function showItem(index) {
      currentIndex = (index + items.length) % items.length;
      var item = items[currentIndex];
      if (!item) return;

      if (img) {
        img.src = item.src;
        img.alt = item.alt;
      }
      if (title) title.textContent = item.title;
      if (sub) sub.textContent = item.sub;
    }

    function open(index, triggerEl) {
      lastTrigger = triggerEl || null;
      showItem(index);
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      var closeBtn = $('.lightbox__close', modal);
      if (closeBtn) closeBtn.focus();
    }

    function close() {
      if (!modal.classList.contains('is-open')) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastTrigger && typeof lastTrigger.focus === 'function') {
        lastTrigger.focus();
      }
    }

    triggers.forEach(function (btn, idx) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        open(idx, btn);
      });
    });

    closeButtons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        close();
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        showItem(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        showItem(currentIndex + 1);
      });
    }

    document.addEventListener('keydown', function (e) {
      if (!modal.classList.contains('is-open')) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showItem(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        showItem(currentIndex + 1);
      } else if (e.key === 'Tab') {
        var focusables = $$('button:not([disabled]), [tabindex]:not([tabindex="-1"])', modal);
        if (!focusables.length) return;
        var first = focusables[0];
        var last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    });
  }

  /* ---- back to top ------------------------------------------------------ */
  function initToTop() {
    var btn = $('#toTop');
    if (!btn) return;
    function onScroll() { btn.classList.toggle('is-visible', window.scrollY > 520); }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---- quote form ------------------------------------------------------- */
  function initForm() {
    var form = $('#quoteForm');
    if (!form) return;
    var card = form.closest('.form-card');
    var submit = $('[type="submit"]', form);
    var errorBox = $('#formError');

    function fail(msg) {
      if (!errorBox) return;
      errorBox.textContent = msg;
      errorBox.classList.add('is-visible');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (errorBox) errorBox.classList.remove('is-visible');
      if (!form.reportValidity()) return;

      var token = '';
      if (window.grecaptcha && typeof window.grecaptcha.getResponse === 'function') {
        try { token = window.grecaptcha.getResponse(); } catch (err) { token = ''; }
        if (!token) { fail('Please confirm the reCAPTCHA check below before sending.'); return; }
      }

      var data = new FormData(form);
      var payload = {
        businessId: CFG.businessId,
        formType: 'contact',
        formName: 'quote-request',
        source: 'website',
        pageUrl: window.location.href,
        name: (data.get('name') || '').toString().trim(),
        email: (data.get('email') || '').toString().trim(),
        phone: (data.get('phone') || '').toString().trim(),
        subject: (data.get('service') || '').toString().trim(),
        message: (data.get('message') || '').toString().trim(),
        fields: {
          service: (data.get('service') || '').toString().trim(),
          timeline: (data.get('timeline') || '').toString().trim()
        },
        recaptchaToken: token
      };

      if (submit) { submit.classList.add('is-loading'); submit.textContent = 'Sending…'; }

      fetch(CFG.apiBaseUrl + '/api/v1/public/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Request failed: ' + res.status);
          if (card) card.classList.add('is-sent');
          form.reset();
          if (window.grecaptcha && window.grecaptcha.reset) { try { window.grecaptcha.reset(); } catch (err) {} }
        })
        .catch(function () {
          fail('Sorry — we could not send that just now. Please call (203) 744-5520 and we will take your details directly.');
        })
        .then(function () {
          if (submit) { submit.classList.remove('is-loading'); submit.textContent = 'Request Free Estimate'; }
        });
    });
  }

  /* ---- boot ------------------------------------------------------------- */
  function start() {
    initHeader();
    initDrawer();
    initHero();
    initQuotes();
    initFaq();
    initGallery();
    initReveal();
    initCounters();
    initHours();
    initSpy();
    initToTop();
    initLightbox();
    initForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
}());
