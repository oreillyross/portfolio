/* Faktor 10 — motion layer.
   The page is fully readable without any of this; everything below is polish. */

(() => {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGsap = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  /* ---------------------------------------------------------------- smooth scroll */

  let lenis = null;

  function initSmoothScroll() {
    if (reduced || typeof window.Lenis === "undefined") return;

    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6
    });

    if (hasGsap) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  function scrollTo(target) {
    if (lenis) lenis.scrollTo(target, { offset: 0 });
    else target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  }

  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      scrollTo(target);
      history.replaceState(null, "", id);
    });
  });

  /* ---------------------------------------------------------------- loader */

  function runLoader() {
    const loader = $("#loader");
    const count = $("#loaderCount");
    const bar = $("#loaderBar");
    const done = () => {
      document.body.classList.remove("is-loading");
      if (loader) loader.classList.add("is-done");
      playHero();
      if (hasGsap) ScrollTrigger.refresh();
    };

    if (!loader || !hasGsap || reduced) {
      if (loader) loader.remove();
      done();
      return;
    }

    const progress = { value: 0 };
    gsap.timeline({ defaults: { ease: "power2.inOut" } })
      .to(progress, {
        value: 100,
        duration: 1.4,
        ease: "power2.out",
        onUpdate() {
          const v = Math.round(progress.value);
          count.textContent = String(v).padStart(2, "0");
          bar.style.width = v + "%";
        }
      })
      .to(loader, { yPercent: -100, duration: 0.9, ease: "expo.inOut", onComplete: () => loader.remove() })
      .add(done, "-=0.45");
  }

  /* ---------------------------------------------------------------- hero / line reveals */

  function playHero() {
    const lines = $$(".hero [data-hero-line]");
    if (!hasGsap || reduced || !lines.length) return;

    gsap.timeline()
      .from(lines, { yPercent: 115, duration: 1.1, ease: "expo.out", stagger: 0.08 })
      .from(".hero__meta .tag", { y: 20, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.7")
      .from(".hero__foot > *", { y: 24, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.6");
  }

  function initLineReveals() {
    if (!hasGsap || reduced) return;
    $$("[data-hero-line]").forEach((el) => {
      if (el.closest(".hero")) return; // handled by the intro timeline
      gsap.from(el, {
        yPercent: 115,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 88%" }
      });
    });
  }

  /* ---------------------------------------------------------------- generic reveals */

  function initReveals() {
    if (!hasGsap || reduced) return;
    $$("[data-reveal]").forEach((el) => {
      gsap.from(el, {
        y: 34,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" }
      });
    });
  }

  /* ---------------------------------------------------------------- word-by-word lighting */

  function initWordText() {
    const blocks = $$("[data-words]");
    if (!blocks.length) return;

    blocks.forEach((block) => {
      const words = block.textContent.trim().split(/\s+/);
      block.textContent = "";
      words.forEach((word, i) => {
        const span = document.createElement("span");
        span.className = "word";
        span.textContent = word;
        block.appendChild(span);
        if (i < words.length - 1) block.appendChild(document.createTextNode(" "));
      });

      const spans = $$(".word", block);
      if (!hasGsap || reduced) {
        spans.forEach((s) => s.classList.add("is-lit"));
        return;
      }

      ScrollTrigger.create({
        trigger: block,
        start: "top 78%",
        end: "bottom 55%",
        scrub: true,
        onUpdate(self) {
          const lit = Math.floor(self.progress * spans.length);
          spans.forEach((s, i) => s.classList.toggle("is-lit", i < lit));
        }
      });
    });
  }

  /* ---------------------------------------------------------------- sticky principle cards */

  function initCards() {
    if (!hasGsap || reduced) return;
    const cards = $$("[data-card]");
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      gsap.to(card, {
        scale: 0.94,
        opacity: 0.45,
        ease: "none",
        scrollTrigger: {
          trigger: cards[i + 1],
          start: "top 80%",
          end: "top 30%",
          scrub: true
        }
      });
    });
  }

  /* ---------------------------------------------------------------- horizontal project rail */

  function initHorizontal() {
    const section = $("#hscroll");
    const track = $("#hscrollTrack");
    if (!section || !track) return;

    if (!hasGsap || reduced || window.matchMedia("(max-width: 860px)").matches) {
      // Fall back to a native swipeable rail on small screens / no GSAP.
      section.style.overflowX = "auto";
      section.style.scrollSnapType = "x mandatory";
      $$(".proj", track).forEach((p) => { p.style.scrollSnapAlign = "start"; });
      return;
    }

    const distance = () => track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => "+=" + distance(),
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    gsap.from($$(".proj", track), {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: { trigger: section, start: "top 70%" }
    });
  }

  /* ---------------------------------------------------------------- marquee */

  function initMarquee() {
    const track = $("#marqueeTrack");
    if (!track || reduced) return;

    const first = track.firstElementChild;
    let width = first.offsetWidth;
    let offset = 0;
    let velocity = 0;
    let last = performance.now();

    if (hasGsap) {
      ScrollTrigger.create({
        onUpdate(self) { velocity = self.getVelocity() / 300; }
      });
    }

    const step = (now) => {
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;
      offset -= (0.6 + Math.abs(velocity)) * dt;
      velocity *= 0.92;
      if (width && offset <= -width) offset += width;
      track.style.transform = `translate3d(${offset}px,0,0)`;
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);

    window.addEventListener("resize", () => { width = first.offsetWidth; }, { passive: true });
  }

  /* ---------------------------------------------------------------- parallax bits */

  function initParallax() {
    if (!hasGsap || reduced) return;
    $$("[data-parallax]").forEach((el) => {
      const depth = parseFloat(el.dataset.parallax) || 0.2;
      gsap.to(el, {
        yPercent: depth * 100,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top top", end: "bottom top", scrub: true }
      });
    });
  }

  /* ---------------------------------------------------------------- nav show / hide */

  function initNav() {
    const nav = $("#nav");
    if (!nav) return;
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle("is-stuck", y > 40);
      nav.classList.toggle("is-hidden", y > lastY && y > 400);
      lastY = y;
    };

    if (lenis) lenis.on("scroll", onScroll);
    else window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------------------------------------------------------- cursor + magnets */

  function initCursor() {
    const cursor = $(".cursor");
    if (!cursor || reduced || !hasGsap) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = $(".cursor__dot", cursor);
    const ring = $(".cursor__ring", cursor);
    const setDotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const setRingX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

    window.addEventListener("pointermove", (e) => {
      gsap.to(cursor, { opacity: 1, duration: 0.3, overwrite: "auto" });
      setDotX(e.clientX); setDotY(e.clientY);
      setRingX(e.clientX); setRingY(e.clientY);
    }, { passive: true });

    $$("a, button, [data-magnetic]").forEach((el) => {
      el.addEventListener("pointerenter", () => cursor.classList.add("is-hot"));
      el.addEventListener("pointerleave", () => cursor.classList.remove("is-hot"));
    });

    $$("[data-magnetic]").forEach((el) => {
      const moveX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
      const moveY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        moveX((e.clientX - (r.left + r.width / 2)) * 0.28);
        moveY((e.clientY - (r.top + r.height / 2)) * 0.28);
      });
      el.addEventListener("pointerleave", () => { moveX(0); moveY(0); });
    });
  }

  /* ---------------------------------------------------------------- boot */

  function boot() {
    initSmoothScroll();
    initNav();
    initWordText();
    initLineReveals();
    initReveals();
    initCards();
    initHorizontal();
    initParallax();
    initMarquee();
    initCursor();
    runLoader();

    if (hasGsap) window.addEventListener("load", () => ScrollTrigger.refresh());
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
