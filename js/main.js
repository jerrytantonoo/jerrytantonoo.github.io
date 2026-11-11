/* ==========================================================================
   Portfolio — rendering and interactions.
   You shouldn't need to edit this file to change content: use js/content.js.
   ========================================================================== */
(function () {
  'use strict';

  const S = window.SITE;
  if (!S) {
    console.error('js/content.js did not load — check the <script> tags in index.html.');
    return;
  }

  const HINTS = !!(S.settings && S.settings.showPlaceholderHints);
  const visible = (arr) => (arr || []).filter((x) => x && !x.hidden);
  S.projects = visible(S.projects);
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ------------------------------------------------------------ helpers */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const pad = (n) => String(n).padStart(2, '0');

  const esc = (s) =>
    String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const isPh = (s) => typeof s === 'string' && s.indexOf('[[') !== -1;
  const purePh = (s) => typeof s === 'string' && /^\s*\[\[[^\]]*\]\]\s*$/.test(s);
  /** a real, filled-in value (not empty, not a placeholder) */
  const has = (s) => typeof s === 'string' && s.trim() !== '' && !isPh(s);
  /** should this value be displayed at all? */
  const show = (v) => {
    if (v == null) return false;
    if (Array.isArray(v)) return v.some(show);
    const s = String(v);
    if (!s.trim()) return false;
    return HINTS || !purePh(s);
  };
  const list = (v) => (Array.isArray(v) ? v : [v]).filter(show);
  const plain = (s) => String(s == null ? '' : s).replace(/\[\[(.+?)\]\]/g, '$1').replace(/\*(.+?)\*/g, '$1');

  /** escape, then *italic* → <em>, [[placeholder]] → highlighted span */
  function fmt(s) {
    let h = esc(s);
    h = h.replace(/\*(.+?)\*/g, '<em>$1</em>');
    h = h.replace(/\[\[(.+?)\]\]/g, HINTS ? '<span class="ph" title="Placeholder — edit in js/content.js">$1</span>' : '$1');
    return h;
  }

  function safeUrl(u) {
    u = String(u || '').trim();
    if (!u || isPh(u)) return '';
    if (/^(https?:|mailto:)/i.test(u)) return u;
    // Embedded images and PDFs (used by the single-file export) are allowed; other data: URLs are not.
    if (/^data:(image\/(jpeg|png|webp|gif)|application\/pdf);base64,/i.test(u)) return u;
    if (/^[a-z][a-z0-9+.-]*:/i.test(u) || u.startsWith('//')) return ''; // block javascript:, data:, etc.
    return u; // relative path
  }
  const validEmail = (e) => has(e) && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim());
  const ext = (href, label, cls = '') =>
    `<a class="${cls}" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${label}</a>`;

  const I = {
    arrow: '<svg class="i-arrow" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrowUR: '<svg class="i-arrow-ur" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrowDown: '<svg class="i-arrow-down" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v15M6 13l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    download: '<svg class="i-arrow-down" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    copy: '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
    check: '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    bigArrow: '<svg width="56" height="56" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h17M14 5.5l6.5 6.5-6.5 6.5" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };

  /* --------------------------------------------- built-in illustrations
     Simple generated SVGs used until you add real screenshots.            */
  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function gridLines(step = 20) {
    let d = '';
    for (let x = -400; x <= 800; x += step) d += `M${x} -300V600`;
    for (let y = -300; y <= 600; y += step) d += `M-400 ${y}H800`;
    return `<rect class="bg" x="-400" y="-300" width="1200" height="900"/><path class="grid" d="${d}"/>`;
  }
  const ART = {
    safety() {
      const r = rng(7);
      let dots = '';
      for (let i = 0; i < 26; i++) dots += `<circle class="fill-soft" cx="${50 + r() * 300}" cy="${50 + r() * 200}" r="2"/>`;
      return `${gridLines()}
        <rect class="panel" x="40" y="40" width="150" height="100" rx="4"/>
        <rect class="panel" x="200" y="40" width="160" height="100" rx="4"/>
        <rect class="panel" x="40" y="150" width="320" height="110" rx="4"/>
        <text class="label" x="50" y="56">ZONE A</text><text class="label" x="210" y="56">ZONE B</text><text class="label" x="50" y="166">ZONE C</text>
        ${dots}
        <circle class="fill" cx="110" cy="100" r="4"/><circle class="fill" cx="265" cy="95" r="4"/><circle class="fill" cx="150" cy="215" r="4"/>
        <circle class="acc-fill" cx="290" cy="205" r="4.5"/>
        <circle class="acc pulse" cx="290" cy="205" r="9" stroke-width="1.2"/>
        <path class="acc" stroke-width="1.6" d="M262 182v-8h8M310 174h8v8M318 228v8h-8M270 236h-8v-8"/>
        <path class="soft" stroke-dasharray="3 4" d="M110 100L265 95L290 205L150 215Z"/>
        <text class="label" x="262" y="252">MONITORING</text>`;
    },
    cloud() {
      return `${gridLines()}
        <g class="soft" stroke-width="1.2"><circle cx="48" cy="128" r="9"/><path d="M30 160c2-12 10-18 18-18s16 6 18 18"/></g>
        <text class="label" x="31" y="180">USERS</text>
        <rect x="104" y="38" width="270" height="168" rx="8" class="strong" stroke-dasharray="5 5" stroke-opacity="0.45"/>
        <text class="label" x="116" y="56">VPC</text>
        <rect class="panel" x="134" y="96" width="96" height="70" rx="6"/>
        <text class="label" x="146" y="118" style="fill-opacity:.9">EC2</text><text class="label" x="146" y="152">FLASK APP</text>
        <rect class="panel" x="270" y="78" width="80" height="54" rx="6"/>
        <text class="label" x="282" y="100" style="fill-opacity:.9">RDS</text><text class="label" x="282" y="120">DATABASE</text>
        <rect class="panel" x="270" y="222" width="80" height="50" rx="6"/>
        <text class="label" x="282" y="244" style="fill-opacity:.9">S3</text><text class="label" x="282" y="262">STORAGE</text>
        <path class="acc" stroke-width="1.5" d="M68 140H134"/><circle class="acc-fill" cx="134" cy="140" r="3"/>
        <path class="soft" stroke-width="1.2" d="M230 118H250V105H270"/>
        <path class="soft" stroke-width="1.2" d="M230 146H250V247H270"/>`;
    },
    web() {
      return `${gridLines()}
        <rect class="panel" x="50" y="40" width="300" height="220" rx="8"/>
        <path class="soft" d="M50 62H350"/>
        <circle class="fill-soft" cx="64" cy="51" r="3"/><circle class="fill-soft" cx="75" cy="51" r="3"/><circle class="fill-soft" cx="86" cy="51" r="3"/>
        <rect class="fill" x="72" y="84" width="150" height="16" rx="2"/>
        <rect class="fill" x="72" y="106" width="110" height="16" rx="2"/>
        <rect class="fill-soft" x="72" y="134" width="170" height="5" rx="2"/>
        <rect class="fill-soft" x="72" y="144" width="140" height="5" rx="2"/>
        <rect class="acc-fill" x="72" y="160" width="54" height="16" rx="8"/>
        <rect class="fill-soft" x="72" y="196" width="78" height="46" rx="4"/>
        <rect class="fill-soft" x="160" y="196" width="78" height="46" rx="4"/>
        <rect class="fill-soft" x="248" y="196" width="78" height="46" rx="4"/>
        <g class="soft"><circle cx="292" cy="112" r="28"/><path d="M264 112h56M292 84v56"/></g>`;
    },
    chat() {
      return `${gridLines()}
        <rect class="panel" x="50" y="50" width="150" height="40" rx="12"/>
        <rect class="fill-soft" x="64" y="64" width="100" height="5" rx="2"/><rect class="fill-soft" x="64" y="74" width="70" height="5" rx="2"/>
        <rect class="fill" x="170" y="104" width="160" height="40" rx="12"/>
        <rect x="184" y="118" width="110" height="5" rx="2" style="fill:var(--bg);opacity:.6"/><rect x="184" y="128" width="80" height="5" rx="2" style="fill:var(--bg);opacity:.6"/>
        <rect class="panel" x="50" y="158" width="120" height="34" rx="12"/>
        <rect class="fill-soft" x="64" y="172" width="80" height="5" rx="2"/>
        <circle class="acc" cx="250" cy="225" r="16" stroke-width="1.4"/><text class="label" x="242" y="228" style="fill:var(--accent);fill-opacity:1">AI</text>
        <path class="soft" stroke-dasharray="3 4" d="M170 175C210 175 220 225 234 225"/>
        <path class="soft" d="M266 225H310"/><rect class="panel" x="310" y="210" width="56" height="30" rx="6"/>
        <text class="label" x="318" y="229">HUMAN</text>
        <text class="label" x="50" y="262">CONCEPT · PLANNED</text>`;
    },
    ml() {
      const r = rng(21);
      let pts = '';
      for (let i = 0; i < 46; i++) {
        const x = 70 + r() * 280;
        const y = 240 - (x - 70) * 0.6 - (r() - 0.5) * 70;
        pts += `<circle class="fill" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill-opacity="${(0.35 + r() * 0.5).toFixed(2)}"/>`;
      }
      return `${gridLines()}
        <path class="soft" d="M60 40V250H360"/>
        <path class="fill-soft" d="M60 266L360 68L360 116L60 290Z" style="fill-opacity:.07" transform="translate(0,-26)"/>
        ${pts}
        <path class="acc" stroke-width="1.8" d="M60 246L360 66"/>
        <text class="label" x="300" y="268">FEATURE</text><text class="label" x="66" y="34">TARGET</text>
        <text class="label" x="262" y="34">CONCEPT · PLANNED</text>`;
    },
  };
  Object.assign(ART, {
    logistics() {
      const houses = [[60, 60], [96, 228], [330, 56], [352, 170], [250, 252], [36, 160], [300, 110]];
      const lines = houses.map(([x, y]) => `<path class="soft" stroke-dasharray="2 4" d="M200 150L${x + 8} ${y + 8}"/>`).join('');
      const boxes = houses.map(([x, y]) => `<rect class="panel" x="${x}" y="${y}" width="16" height="16" rx="2"/>`).join('');
      return `${gridLines()}
        <path class="strong" style="stroke-opacity:.07" stroke-width="12" d="M-20 150H420M200 -20V320"/>
        ${lines}${boxes}
        <rect class="fill" x="186" y="136" width="28" height="28" rx="4"/>
        <text class="label" x="220" y="132">HUB</text>
        <path class="acc" stroke-width="1.6" d="M200 150L124 96M200 150L282 204"/>
        <circle class="acc-fill" cx="124" cy="96" r="6"/><circle class="acc pulse" cx="124" cy="96" r="10" stroke-width="1.2"/>
        <circle class="acc-fill" cx="282" cy="204" r="6"/><circle class="acc pulse" cx="282" cy="204" r="10" stroke-width="1.2"/>
        <text class="label" x="96" y="80" style="fill:var(--accent);fill-opacity:1">PICKUP</text>
        <text class="label" x="290" y="232" style="fill:var(--accent);fill-opacity:1">PICKUP</text>
        <text class="label" x="226" y="286">DOORSTEP ··· VS ── PICKUP</text>`;
    },
    dashboard() {
      const pts = [[70, 214], [104, 206], [138, 196], [172, 182], [206, 164], [240, 140], [274, 112]];
      const line = pts.map((p) => p.join(' ')).join(' L');
      const bars = [[300, 120], [318, 160], [336, 196], [354, 222]];
      return `${gridLines()}
        <rect class="panel" x="40" y="36" width="330" height="228" rx="8"/>
        <rect class="fill-soft" x="58" y="54" width="86" height="40" rx="4"/>
        <rect class="fill-soft" x="154" y="54" width="86" height="40" rx="4"/>
        <rect class="fill-soft" x="250" y="54" width="102" height="40" rx="4"/>
        <rect class="fill" x="66" y="74" width="44" height="10" rx="2"/>
        <rect class="fill" x="162" y="74" width="54" height="10" rx="2"/>
        <rect class="acc-fill" x="258" y="74" width="40" height="10" rx="2"/>
        <path class="soft" d="M62 110V230H282"/>
        <path class="fill-soft" style="fill-opacity:.08" d="M${line} L274 230 L70 230Z"/>
        <path class="acc" stroke-width="2" d="M${line}"/>
        <circle class="acc-fill" cx="274" cy="112" r="3.5"/>
        <text class="label" x="226" y="104">2045</text>
        ${bars.map(([x, y]) => `<rect class="fill" fill-opacity=".75" x="${x}" y="${y}" width="12" height="${230 - y}" rx="2"/>`).join('')}
        <text class="label" x="298" y="246">81× GAP</text>`;
    },
    pipeline() {
      return `${gridLines()}
        <rect class="panel" x="22" y="118" width="60" height="64" rx="12"/>
        <text class="label" x="36" y="146" style="fill-opacity:.9">IMU</text><text class="label" x="30" y="166">NESSO</text>
        <g class="acc" stroke-width="1.4" stroke-linecap="round"><path d="M92 138q8 12 0 24"/><path d="M100 132q12 18 0 36"/></g>
        <text class="label" x="88" y="196" style="fill:var(--accent);fill-opacity:1">BLE</text>
        <rect class="panel" x="122" y="116" width="72" height="68" rx="6"/>
        <text class="label" x="132" y="142" style="fill-opacity:.9">GATEWAY</text><text class="label" x="132" y="162">BLEAK</text>
        <path class="soft" d="M194 150H214M214 88V212M214 88H226M214 150H226M214 212H226"/>
        ${[70, 132, 194].map((y) => `<g><path class="panel" d="M226 ${y + 6}v24a20 6 0 0 0 40 0v-24"/><ellipse class="panel" cx="246" cy="${y + 6}" rx="20" ry="6"/></g>`).join('')}
        <text class="label" x="274" y="96">WORKERS</text><text class="label" x="274" y="158">SAFETY</text><text class="label" x="274" y="220">FALLS</text>
        <path class="soft" d="M266 150H300" transform="translate(0,0)" stroke-dasharray="3 3"/>
        <rect class="panel" x="318" y="104" width="66" height="92" rx="6"/>
        <rect class="fill-soft" x="328" y="140" width="8" height="40" rx="1"/><rect class="fill-soft" x="340" y="128" width="8" height="52" rx="1"/><rect class="fill-soft" x="352" y="150" width="8" height="30" rx="1"/>
        <circle class="acc-fill" cx="370" cy="118" r="4"/><circle class="acc pulse" cx="370" cy="118" r="8" stroke-width="1.2"/>
        <text class="label" x="322" y="212">DASHBOARD</text>
        <text class="label" x="22" y="270">84,106 READINGS → 56,387 EVENTS → 764 FLAGS</text>`;
    },
    traffic() {
      return `${gridLines()}
        <rect class="panel" x="168" y="36" width="64" height="192" rx="14"/>
        <circle cx="200" cy="80" r="20" style="fill:var(--accent)"/>
        <circle cx="200" cy="132" r="20" style="fill:#E3A23B;fill-opacity:.35"/>
        <circle cx="200" cy="184" r="20" style="fill:#2BA471;fill-opacity:.35"/>
        <circle class="acc pulse" cx="200" cy="80" r="24" stroke-width="1.2"/>
        <path class="strong" style="stroke-opacity:.5" stroke-width="2" d="M200 228V270M176 270H224"/>
        <rect class="panel" x="56" y="122" width="56" height="40" rx="6"/>
        <text class="label" x="68" y="146">SOUND</text>
        <g class="soft" stroke-width="1.3" stroke-linecap="round"><path d="M120 132q8 10 0 20"/><path d="M128 126q12 16 0 32"/><path d="M136 120q16 22 0 44"/></g>
        <path class="soft" stroke-dasharray="3 4" d="M112 142H168"/>
        <text class="label" x="252" y="84">LOUD</text><text class="label" x="252" y="136">RISING</text><text class="label" x="252" y="188">QUIET</text>
        <path class="soft" d="M244 80H236M244 132H236M244 184H236"/>`;
    },
    floorplan() {
      return `${gridLines()}
        <path class="strong" stroke-width="4" stroke-linecap="square" fill="none"
          d="M50 40H350V260H50Z M210 40V150 M50 150H130 M170 150H210 M210 196H350 M280 196V260"/>
        <path class="soft" d="M130 150a40 40 0 0 1 40 0" />
        <path class="soft" d="M210 196a30 30 0 0 0 30 -30"/>
        <rect class="fill-soft" x="70" y="62" width="90" height="36" rx="6"/>
        <rect class="fill-soft" x="80" y="108" width="50" height="22" rx="3"/>
        <rect class="fill-soft" x="232" y="62" width="96" height="70" rx="4"/>
        <rect class="fill-soft" x="70" y="176" width="110" height="24" rx="3"/>
        <circle class="fill-soft" cx="150" cy="226" r="16"/>
        ${[[115, 115], [280, 97], [150, 226], [315, 228]].map(([x, y]) => `<circle class="acc-fill" cx="${x}" cy="${y}" r="3"/><circle class="acc" cx="${x}" cy="${y}" r="14" stroke-opacity=".35"/>`).join('')}
        <text class="label" x="60" y="56">LIVING</text><text class="label" x="222" y="56">BEDROOM</text><text class="label" x="60" y="166">DINING</text><text class="label" x="290" y="212">STUDY</text>`;
    },
  });

  function art(key, label) {
    const fn = ART[key] || ART.web;
    const a11y = label ? `role="img" aria-label="${esc(label)}"` : 'aria-hidden="true" focusable="false"';
    return `<svg class="art" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" ${a11y}>${fn()}</svg>`;
  }
  function media(p, labelled) {
    const src = safeUrl(p.cover);
    if (src) {
      const pos = p.coverPosition ? ` style="object-position:${esc(p.coverPosition)}"` : '';
      const alt = labelled ? esc(plain(p.coverAlt || p.title + ' — cover image')) : '';
      return `<img src="${esc(src)}" alt="${alt}" loading="lazy" decoding="async"${pos}>`;
    }
    return art(p.art, labelled ? `Illustration for ${plain(p.title)}` : '');
  }

  /* ------------------------------------------------------------- render */
  function renderChrome() {
    const p = S.person;
    $$('[data-name]').forEach((el) => (el.innerHTML = fmt(p.name)));
    $$('[data-initials]').forEach((el) => (el.innerHTML = fmt(p.initials)));
    if (!isPh(p.name)) document.title = `${p.name} — ${p.role}, ${p.location}`;

    // Structured data for search engines (only once your real name is in)
    if (!isPh(p.name)) {
      const ld = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: p.name,
        jobTitle: p.role,
        address: { '@type': 'PostalAddress', addressLocality: p.location, addressCountry: 'SG' },
        affiliation: { '@type': 'CollegeOrUniversity', name: p.school },
        email: validEmail(S.contact.email) ? 'mailto:' + S.contact.email.trim() : undefined,
        knowsAbout: (S.about.interests || []).filter(has),
        sameAs: [S.contact.linkedin, S.contact.github].filter(has),
      };
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.textContent = JSON.stringify(ld);
      document.head.appendChild(s);
    }
  }

  function renderHero() {
    const p = S.person;
    const h = S.hero;
    const name = plain(p.name);
    const words = name.split(/\s+/).filter(Boolean)
      .map((w, i) => `<span class="w"><span style="--d:${i}">${esc(w)}</span></span>`).join(' ');
    const status = p.availability && p.availability.open
      ? `<p class="status fade-up"><span class="status__dot" aria-hidden="true"></span><span>${fmt(p.availability.label)}</span></p>`
      : '<span></span>';
    const meta = (h.meta || []).filter((m) => show(m.value))
      .map((m) => `<div><dt>${fmt(m.label)}</dt><dd>${fmt(m.value)}</dd></div>`).join('');
    const src = safeUrl(p.portrait);
    const photo = src
      ? `<div class="hero__photo fade-up" style="--d:2"><img src="${esc(src)}" alt="${esc(plain(p.portraitAlt))}" decoding="async" fetchpriority="high"${p.portraitPosition ? ` style="object-position:${esc(p.portraitPosition)}"` : ''}></div>`
      : '';

    $('#hero').innerHTML = `
      <div class="hero__top">
        ${status}
        <p class="mono hero__clock fade-up" style="--d:1">${fmt(p.location)} · <b data-clock>--:--</b> ${esc(p.timezoneLabel || '')}</p>
      </div>
      <div>
        <p class="mono hero__role fade-up" style="--d:1">${fmt(p.role)} — ${fmt(p.school)}</p>
        <div class="hero__id">
          <h1 class="hero__name${HINTS && isPh(p.name) ? ' is-ph' : ''}"><span class="sr-only">${esc(name)}</span><span aria-hidden="true">${words}</span></h1>
          ${photo}
        </div>
      </div>
      <div class="hero__grid">
        <p class="hero__lede fade-up" style="--d:2">${fmt(h.headline)}</p>
        <div class="hero__aside fade-up" style="--d:3">
          <p>${fmt(h.description)}</p>
          <div class="hero__ctas">
            <a class="btn btn--solid" href="#work">View my work ${I.arrow}</a>
            <a class="btn" href="#about">About me</a>
            <a class="btn" href="#contact">Contact</a>
          </div>
        </div>
      </div>
      <dl class="hero__meta fade-up" style="--d:4">${meta}</dl>`;

    // Scrolling band under the hero (hero.marquee in content.js)
    const mq = $('#marquee');
    const bandWords = list(h.marquee);
    if (mq && bandWords.length) {
      const group = `<span class="marquee__group">${bandWords.map((w) => `<span class="marquee__item">${fmt(w)}</span><span class="marquee__dot" aria-hidden="true"></span>`).join('')}</span>`;
      mq.innerHTML = `<div class="marquee__track">${group}${group}</div>`;
    } else if (mq) mq.remove();
  }

  /** A stat value; plain numbers get data-count so they count up on scroll. */
  function statValue(st) {
    const pre = st.prefix || '', suf = st.suffix || '';
    if (typeof st.value === 'number') {
      return `<span data-count="${st.value}" data-prefix="${esc(pre)}" data-suffix="${esc(suf)}">${esc(pre)}${st.value.toLocaleString('en-US')}${esc(suf)}</span>`;
    }
    return `${esc(pre)}${fmt(st.value)}${esc(suf)}`;
  }

  function renderAbout() {
    const a = S.about;
    const p = S.person;
    const src = safeUrl(a.photo);
    const portrait = src
      ? `<div class="portrait"><img src="${esc(src)}" alt="${esc(plain(a.photoAlt))}" loading="lazy" decoding="async"${a.photoPosition ? ` style="object-position:${esc(a.photoPosition)}"` : ''}></div>`
      : `<div class="portrait portrait--empty">
           <span class="portrait__initials" aria-hidden="true">${fmt(p.initials)}</span>
           ${HINTS ? '<p class="portrait__hint"><span class="ph">Add a photo — set about.photo in content.js</span></p>' : ''}
         </div>`;
    const facts = (a.facts || []).filter((f) => show(f.value))
      .map((f) => `<div><dt>${fmt(f.label)}</dt><dd>${fmt(f.value)}</dd></div>`).join('');
    const interests = (a.interests || []).filter(show).map((t) => `<li class="tag">${fmt(t)}</li>`).join('');

    $('#about-body').innerHTML = `
      <div class="about">
        <div class="about__portrait reveal">
          ${portrait}
          <p class="portrait__caption mono"><span>${fmt(p.location)}</span><span>${fmt(p.school)}</span></p>
        </div>
        <div class="about__body">
          <p class="about__lead reveal">${fmt(a.lead)}</p>
          <div class="about__text">${list(a.paragraphs).map((t, i) => `<p class="reveal" style="--d:${i % 3}">${fmt(t)}</p>`).join('')}</div>
          ${facts ? `<dl class="facts reveal">${facts}</dl>` : ''}
          ${interests ? `<div class="interests reveal"><h3>Interests</h3><ul class="tags">${interests}</ul></div>` : ''}
        </div>
      </div>`;
  }

  function renderWork() {
    $('#work-body').innerHTML = S.projects.map((p, i) => {
      const tags = list(p.tags).map((t) => `<li class="tag">${fmt(t)}</li>`).join('');
      const stats = (p.stats || []).slice(0, 2).map((s) => `<div><dt>${statValue(s)}</dt><dd>${fmt(s.label)}</dd></div>`).join('');
      return `<article class="card${p.featured ? ' card--lg' : ''} reveal" style="--d:${i % 3}">
          <div class="card__media" data-tilt>
            ${media(p, false)}
            <span class="card__peek" aria-hidden="true">View project ${I.arrow}</span>
          </div>
          <div class="card__meta mono"><span>${pad(i + 1)}</span><span>${show(p.year) ? fmt(p.year) : ''}</span></div>
          <h3 class="card__title">${fmt(p.title)}</h3>
          <p class="card__summary">${fmt(p.summary)}</p>
          ${stats ? `<dl class="card__stats">${stats}</dl>` : ''}
          ${tags ? `<ul class="tags" aria-label="Technologies">${tags}</ul>` : ''}
          <button class="card__cta" type="button" data-open="${esc(p.slug)}" aria-haspopup="dialog">
            <span>View project<span class="sr-only">: ${esc(plain(p.title))}</span></span>
            <span class="card__circle" aria-hidden="true">${I.arrow}</span>
          </button>
        </article>`;
    }).join('');
  }

  function renderExperience() {
    const e = S.experience;
    const intro = $('[data-exp-intro]');
    if (intro) intro.innerHTML = fmt(e.intro);
    const caps = list(e.capabilities).map((c) => `<li class="tag">${fmt(c)}</li>`).join('');
    const roles = (e.roles || []).map((r, i) => `
      <article class="role reveal" style="--d:${i}">
        <div class="role__when mono">
          ${show(r.dates) ? `<span>${fmt(r.dates)}</span>` : ''}
          ${show(r.type) ? `<span>${fmt(r.type)}</span>` : ''}
          ${show(r.location) ? `<span>${fmt(r.location)}</span>` : ''}
        </div>
        <div class="role__head">
          <h3 class="role__company">${fmt(r.company)}</h3>
          <p class="role__title">${fmt(r.role)}</p>
        </div>
        <ul class="role__list">${list(r.bullets).map((b) => `<li>${fmt(b)}</li>`).join('')}</ul>
      </article>`).join('');
    const ed = S.education || {};
    const schools = visible(ed.schools).map((s, i) => {
      return `
      <article class="role reveal" style="--d:${i}">
        <div class="role__when mono"><span>${fmt(s.dates)}</span></div>
        <div class="role__head">
          <h3 class="role__company">${fmt(s.school)}</h3>
          <p class="role__title">${fmt(s.qualification)}</p>
        </div>
        <div class="role__list-wrap">
          ${list(s.details).length ? `<ul class="role__list">${list(s.details).map((d) => `<li>${fmt(d)}</li>`).join('')}</ul>` : ''}        </div>
      </article>`;
    }).join('');

    $('#experience-body').innerHTML =
      (caps ? `<div class="capabilities reveal"><h3>What I bring</h3><ul class="tags">${caps}</ul></div>` : '') +
      `<div>${roles}</div>` +
      (schools ? `<div class="subhead reveal"><h3>Education</h3></div><div>${schools}</div>` : '');
  }

  const SHUTTLE = '<svg class="i-shuttle" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 7l12 3.4v3.2L2 17z" fill="currentColor" opacity=".5"/><circle cx="17.5" cy="12" r="4" fill="currentColor"/></svg>';
  const SHUTTLE_SVG = '<path class="court__skirt" d="M-30 -15L8 -6V6L-30 15Z"/><path class="court__feathers" d="M-30 -15L8 -6M-30 15L8 6M-30 -5L8 -2M-30 5L8 2"/><circle class="court__cork" cx="15" cy="0" r="10"/>';

  function renderBeyond() {
    const b = S.beyond;
    const mount = $('#beyond-body');
    if (!b || !mount) return;
    const intro = $('[data-beyond-intro]');
    if (intro) intro.innerHTML = fmt(b.intro);
    const ach = visible(b.achievements).map((a, i) => `
      <li class="ach reveal" style="--d:${i % 3}">
        <span class="ach__no mono" aria-hidden="true">${pad(i + 1)}</span>
        <span class="ach__result">${fmt(a.result)}</span>
        <span class="ach__event">${fmt(a.event)}${show(a.category) ? `<span class="ach__cat">${fmt(a.category)}</span>` : ''}</span>
        <span class="ach__where mono">${show(a.where) ? fmt(a.where) : ''}</span>
        <span class="ach__shuttle" aria-hidden="true">${SHUTTLE}</span>
      </li>`).join('');

    // The court: real proportions (13.40 m × 6.10 m, 1 unit = 1 cm).
    const ct = b.court || {};
    const cstats = (ct.stats || []).map((s) => `<div class="court__stat"><dt>${statValue(s)}</dt><dd>${fmt(s.label)}</dd></div>`).join('');
    const court = cstats || show(ct.title) ? `
      <div class="court reveal" data-court>
        <svg class="court__svg" viewBox="-60 -90 1460 790" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
          <g class="court__lines">
            <rect x="0" y="0" width="1340" height="610" pathLength="1"/>
            <path pathLength="1" d="M0 46H1340M0 564H1340M76 0V610M1264 0V610M472 0V610M868 0V610M0 305H472M868 305H1340"/>
          </g>
          <path class="court__net" d="M670 -40V650"/>
          <path class="court__flight" id="court-flight" d="M250 430C470 -170 870 -170 1090 430C860 -60 480 -60 250 430"/>
          <g class="court__shuttle">${SHUTTLE_SVG}
            <animateMotion id="court-rally" dur="2.8s" begin="indefinite" repeatCount="indefinite" rotate="auto" calcMode="spline" keyPoints="0;0.58;1" keyTimes="0;0.5;1" keySplines=".35 0 .65 1;.35 0 .65 1"><mpath href="#court-flight"/></animateMotion>
          </g>
        </svg>
        <div class="court__top">
          <div>
            ${show(ct.kicker) ? `<p class="mono court__kicker">${fmt(ct.kicker)}</p>` : ''}
            ${show(ct.title) ? `<h3 class="court__title">${fmt(ct.title)}</h3>` : ''}
          </div>
          <div class="court__serve">
            <button class="btn btn--sm court__btn" type="button" data-rally-toggle aria-pressed="false"><span data-rally-label>Pause</span> ${SHUTTLE}</button>
            <p class="mono court__count" aria-live="polite"><span data-rally>0</span> <span data-rally-word>rallies</span></p>
          </div>
        </div>
        ${cstats ? `<dl class="court__stats">${cstats}</dl>` : ''}
      </div>` : '';
    const com = visible(b.community).map((c, i) => `
      <article class="vol reveal" style="--d:${i}">
        <p class="mono vol__org">${fmt(c.org)}</p>
        <h4 class="vol__title">${fmt(c.title)}</h4>
        <p class="vol__text">${fmt(c.description)}</p>
      </article>`).join('');
    mount.innerHTML = court +
      (ach ? `<div class="subhead reveal"><h3>${fmt(b.achievementsTitle || 'Achievements')}</h3><p class="mono subhead__note">Badminton · tournament results</p></div><ol class="ach-list">${ach}</ol>` : '') +
      (com ? `<div class="subhead reveal"><h3>${fmt(b.communityTitle || 'Community')}</h3></div><div class="vol-grid">${com}</div>` : '');
  }

  function renderResume() {
    const r = S.resume;
    const c = S.contact;
    const p = S.person;
    const file = safeUrl(r.file);
    const baseName = (u) => u.split('/').pop().split('?')[0];
    const fullCv = r.ready && has(r.fullCv) ? safeUrl(r.fullCv) : '';
    let primary;
    if (r.ready && file) {
      primary = `<a class="btn btn--solid" href="${esc(file)}" download="${esc(baseName(file))}">${I.download} Download CV <span class="mono">PDF</span></a>`
        + (fullCv ? `<a class="btn" href="${esc(fullCv)}" download="${esc(baseName(fullCv))}">${I.download} Full CV <span class="mono">2 pages</span></a>` : '');
    } else if (validEmail(c.email)) {
      primary = `<a class="btn btn--solid" href="mailto:${esc(c.email.trim())}?subject=${encodeURIComponent('CV request')}">Request my CV ${I.arrow}</a>`;
    } else {
      primary = '<span class="btn btn--solid" aria-disabled="true">Download CV</span>';
    }
    const secondary = has(c.linkedin) && safeUrl(c.linkedin)
      ? ext(safeUrl(c.linkedin), `View LinkedIn ${I.arrowUR}`, 'btn') : '';
    let note = '';
    if (r.ready && show(r.updated)) note = `<p class="resume__updated mono">Last updated ${fmt(r.updated)}</p>`;
    else if (!r.ready && HINTS) note = '<p class="resume__updated"><span class="ph">Add your PDF to assets/cv/ and set resume.ready: true in content.js</span></p>';
    const glance = (r.glance || []).filter((g) => show(g.value))
      .map((g) => `<div><dt>${fmt(g.label)}</dt><dd>${fmt(g.value)}</dd></div>`).join('');

    $('#resume-body').innerHTML = `
      <div class="resume">
        <div class="resume__main">
          <p class="section__index reveal">Resume</p>
          <h2 class="resume__title reveal" id="resume-title">The one-page <em>version</em>.</h2>
          <p class="resume__text reveal">Everything on this site, condensed into a CV you can save or forward to your team.</p>
          <div class="resume__actions reveal">${primary}${secondary}</div>
          ${note}
        </div>
        ${glance ? `<dl class="resume__glance reveal">${glance}</dl>` : ''}
      </div>`;
  }

  function renderContact() {
    const c = S.contact;
    const p = S.person;
    const email = validEmail(c.email) ? c.email.trim() : '';
    const linkedin = safeUrl(c.linkedin);
    const github = safeUrl(c.github);

    let emailBlock = '';
    if (email) {
      emailBlock = `<div>
          <p class="mono contact__email-label">Email</p>
          <div class="contact__email">
            <a class="text-link" href="mailto:${esc(email)}">${esc(email)}</a>
            <button class="icon-btn" type="button" data-copy="${esc(email)}" aria-label="Copy email address">${I.copy}</button>
          </div>
        </div>`;
    } else if (HINTS) {
      emailBlock = `<div><p class="mono contact__email-label">Email</p>
          <div class="contact__email"><span class="muted"><span class="ph">Add contact.email in content.js</span></span></div></div>`;
    }

    const row = (label, url, hint) => {
      if (url) return `<li>${ext(url, `<span>${label}</span>${I.arrowUR}`)}</li>`;
      return HINTS ? `<li><span class="contact__row"><span>${label}</span><span class="ph">${hint}</span></span></li>` : '';
    };
    const links = [
      row('LinkedIn', linkedin, 'Add contact.linkedin'),
      github ? `<li>${ext(github, `<span>GitHub</span>${I.arrowUR}`)}</li>` : '', // shown only once a real URL is set
      has(c.phone) && c.phone.replace(/\D/g, '').length >= 8
        ? `<li>${ext('https://wa.me/' + c.phone.replace(/\D/g, ''), `<span>WhatsApp</span>${I.arrowUR}`)}</li>` : '',
      `<li><a href="#resume"><span>Resume</span>${I.arrowDown}</a></li>`,
      `<li><span class="contact__row"><span>Based in</span><span class="mono">${fmt(p.location)}</span></span></li>`,
    ].join('');

    let mode = '';
    if (has(c.formEndpoint)) mode = '';
    else if (email) mode = 'Sending opens your email app with the message ready to go.';
    else if (HINTS) mode = '<span class="ph">Add contact.email or contact.formEndpoint in content.js to make this form work.</span>';

    $('#contact-body').innerHTML = `
      <div class="contact__info">
        ${show(c.intro) ? `<p class="contact__intro reveal">${fmt(c.intro)}</p>` : ''}
        ${emailBlock ? `<div class="reveal">${emailBlock}</div>` : ''}
        <ul class="contact__links reveal">${links}</ul>
        ${show(c.responseNote) ? `<p class="muted reveal">${fmt(c.responseNote)}</p>` : ''}
      </div>
      <form class="form reveal" id="contact-form" novalidate ${has(c.formEndpoint) ? `action="${esc(safeUrl(c.formEndpoint))}" method="POST"` : ''}>
        <div class="form__hp" aria-hidden="true"><label>Leave this field empty <input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label></div>
        <div class="form__row">
          <div class="field">
            <label for="f-name">Your name</label>
            <input id="f-name" name="name" type="text" autocomplete="name" required aria-describedby="f-name-err">
            <p class="field__error" id="f-name-err"></p>
          </div>
          <div class="field">
            <label for="f-email">Your email</label>
            <input id="f-email" name="email" type="email" autocomplete="email" required aria-describedby="f-email-err">
            <p class="field__error" id="f-email-err"></p>
          </div>
        </div>
        <div class="field">
          <label for="f-msg">Message</label>
          <textarea id="f-msg" name="message" rows="5" required placeholder="Tell me a little about the role or project…" aria-describedby="f-msg-err"></textarea>
          <p class="field__error" id="f-msg-err"></p>
        </div>
        <div class="form__foot">
          <button class="btn btn--solid" type="submit">Send message ${I.arrow}</button>
          <p class="form__status" role="status" aria-live="polite"></p>
        </div>
        ${mode ? `<p class="form__note">${mode}</p>` : ''}
      </form>`;
  }

  function renderFooter() {
    const c = S.contact;
    const p = S.person;
    const items = [];
    if (validEmail(c.email)) items.push(`<li><a href="mailto:${esc(c.email.trim())}">Email</a></li>`);
    if (safeUrl(c.linkedin)) items.push(`<li>${ext(safeUrl(c.linkedin), 'LinkedIn')}</li>`);
    if (safeUrl(c.github)) items.push(`<li>${ext(safeUrl(c.github), 'GitHub')}</li>`);
    items.push('<li><a href="#top">Back to top ↑</a></li>');
    $('#footer-body').innerHTML = `
      <p>© ${new Date().getFullYear()} ${fmt(p.name)} · ${fmt(p.location)}</p>
      <ul class="footer__links">${items.join('')}</ul>`;
  }

  /* ------------------------------------------------------ project detail */
  function caseHTML(p, i) {
    const n = S.projects.length;
    const next = S.projects[(i + 1) % n];
    const paras = (v) => list(v).map((x) => `<p>${fmt(x)}</p>`).join('');
    const bullets = (v) => {
      const l = list(v);
      return l.length ? `<ul>${l.map((x) => `<li>${fmt(x)}</li>`).join('')}</ul>` : '';
    };

    const meta = [['Role', p.role], ['Timeline', p.year], ['Type', p.type], ['Team', p.team]]
      .filter(([, v]) => show(v))
      .map(([k, v]) => `<div><dt>${k}</dt><dd>${fmt(v)}</dd></div>`).join('');

    const links = p.links || {};
    const gh = safeUrl(links.github);
    const demo = safeUrl(links.demo);
    let linkHTML = '';
    if (gh || demo) {
      linkHTML = `<div class="case__links">
        ${demo ? ext(demo, `Live demo ${I.arrowUR}`, 'btn btn--solid') : ''}
        ${gh ? ext(gh, `View on GitHub ${I.arrowUR}`, 'btn') : ''}
      </div>`;
    }

    const items = (p.gallery || []).filter((g) => g && (g.art || safeUrl(g.src)));
    let gallery = '';
    if (items.length) {
      gallery = `<div class="gallery">${items.map((g) => `
        <figure>
          ${g.art
            ? `<div class="gallery__media">${art(g.art, plain(g.caption || p.title))}</div>`
            : `<a class="gallery__media gallery__media--img" href="${esc(safeUrl(g.src))}" target="_blank" rel="noopener" aria-label="Open full-size image: ${esc(plain(g.alt || g.caption || p.title))}"><img src="${esc(safeUrl(g.src))}" alt="${esc(plain(g.alt || g.caption || ''))}" loading="lazy" decoding="async"></a>`}
          ${show(g.caption) ? `<figcaption>${fmt(g.caption)}</figcaption>` : ''}
        </figure>`).join('')}</div>`;
    } else if (HINTS && p.gallery !== false) {
      gallery = '<div class="gallery"><div class="gallery__empty"><span class="ph">Add screenshots or diagrams: put images in assets/img/projects/ and list them under gallery in content.js</span></div></div>';
    }

    let k = 0;
    const rows = [];
    const row = (title, html, wide) => {
      if (!html) return;
      k++;
      rows.push(`<section class="case__row${wide ? ' case__row--wide' : ''}"><h3><span>${pad(k)}</span>${title}</h3><div class="case__row-body">${html}</div></section>`);
    };
    row('Overview', paras(p.overview));
    row('The problem', paras(p.problem));
    row('My approach', paras(p.approach));
    // highlights: one { title, text?, items? } section, or an array of them.
    [].concat(p.highlights || []).filter(Boolean)
      .forEach((h) => row(fmt(h.title || 'Highlights'), (paras(h.text) + bullets(h.items)) || ''));
    const tags = list(p.tags).map((t) => `<li class="tag">${fmt(t)}</li>`).join('');
    row(p.tagsTitle ? fmt(p.tagsTitle) : 'Technologies', tags ? `<ul class="tags">${tags}</ul>` : '');
    row('Screenshots &amp; diagrams', gallery, true);
    row('My contributions', bullets(p.contributions));
    row('Results', paras(p.results));
    row('Lessons learned', paras(p.lessons));

    return `
      <header class="container case__hero">
        <p class="mono case__kicker"><span>${pad(i + 1)} / ${pad(n)}</span>${show(p.type) ? `<span>${fmt(p.type)}</span>` : ''}</p>
        <h2 class="case__title" id="case-title">${fmt(p.title)}</h2>
        <p class="case__summary">${fmt(p.summary)}</p>
        ${meta ? `<dl class="case__meta">${meta}</dl>` : ''}
        ${linkHTML}
      </header>
      <div class="container"><div class="case__cover">${media(p, true)}</div></div>
      <div class="container case__body">${rows.join('')}</div>
      <button class="case__next" type="button" data-goto="${esc(next.slug)}">
        <span class="container" style="display:block">
          <span class="mono">Next project</span>
          <span class="case__next-title"><span>${fmt(next.title)}</span>${I.bigArrow}</span>
        </span>
      </button>`;
  }

  /* -------------------------------------------------------- interactions */
  const live = document.createElement('p');
  live.className = 'sr-only';
  live.setAttribute('aria-live', 'polite');
  document.body.appendChild(live);
  const announce = (msg) => { live.textContent = ''; setTimeout(() => (live.textContent = msg), 30); };

  let scrollLocked = false;
  function lockScroll(on) {
    if (on === scrollLocked) return;
    scrollLocked = on;
    const sw = window.innerWidth - root.clientWidth;
    document.body.style.paddingRight = on && sw > 0 ? sw + 'px' : '';
    $('#nav').style.paddingRight = on && sw > 0 ? sw + 'px' : '';
    document.body.classList.toggle('is-locked', on);
  }

  // The site follows the system light/dark setting; repaint the hero canvas when it changes.
  function initTheme() {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener && mq.addEventListener('change', () => window.dispatchEvent(new Event('themechange')));
  }

  let menuOpen = false;
  function initNav() {
    const nav = $('#nav');
    const progress = $('.progress i', nav);
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle('is-scrolled', y > 16);
      if (!menuOpen && !scrollLocked) nav.classList.toggle('is-hidden', y > lastY + 2 && y > 480);
      if (y < lastY - 2) nav.classList.remove('is-hidden');
      lastY = y;
      ticking = false;
      // reading-progress bar under the nav
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, y / max)).toFixed(4) : 0})`;
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();
    // keep nav visible when keyboard focus moves into it
    nav.addEventListener('focusin', () => nav.classList.remove('is-hidden'));

    // Active section highlighting
    const links = $$('.nav__links a');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const id = '#' + en.target.id;
          links.forEach((a) => (a.getAttribute('href') === id ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      ['top', 'about', 'work', 'experience', 'beyond', 'resume', 'contact'].forEach((id) => { const el = document.getElementById(id); el && io.observe(el); });
    }

    // Mobile menu
    const toggle = $('#menu-toggle');
    const menu = $('#menu');
    const setMenu = (open, returnFocus) => {
      menuOpen = open;
      menu.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      nav.classList.remove('is-hidden');
      lockScroll(open);
      if (open) { const first = $('a', menu); first && first.focus(); }
      else if (returnFocus) toggle.focus();
    };
    toggle.addEventListener('click', () => setMenu(!menuOpen));
    // Close the menu first, then scroll: scrolling while the page is still
    // locked by the open menu stops partway.
    menu.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      const target = href.startsWith('#') && href.length > 1 ? document.getElementById(href.slice(1)) : null;
      setMenu(false);
      if (!target) return;
      e.preventDefault();
      if (location.hash !== href) history.pushState(null, '', href);
      setTimeout(() => target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }), 30);
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menuOpen) setMenu(false, true); });
    window.addEventListener('resize', () => { if (menuOpen && window.innerWidth > 1024) setMenu(false); });
  }

  function initReveal() {
    const els = $$('.reveal');
    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    els.forEach((el) => io.observe(el));
  }

  /* Hero "signal field": a calm dot grid that drifts and reacts to the cursor. */
  function initField() {
    const canvas = $('.hero__field');
    const hero = $('#top');
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, pts = [], ink = '#141413', acc = '#D9431A';
    let raf = 0, running = false, visible = true, t = 0, last = 0;
    const mouse = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4 };
    const smooth = (a, b, x) => { const k = Math.min(1, Math.max(0, (x - a) / (b - a))); return k * k * (3 - 2 * k); };
    const hash = (i, j) => { const s = Math.sin(i * 127.1 + j * 311.7) * 43758.5453; return s - Math.floor(s); };

    function readColors() {
      const cs = getComputedStyle(root);
      ink = cs.getPropertyValue('--ink').trim() || ink;
      acc = cs.getPropertyValue('--accent').trim() || acc;
    }
    function build() {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const mobile = W < 720;
      const gap = mobile ? 22 : 30;
      const cols = Math.ceil(W / gap) + 1, rows = Math.ceil(H / gap) + 1;
      const ox = (W - (cols - 1) * gap) / 2, oy = (H - (rows - 1) * gap) / 2;
      pts = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = ox + i * gap, y = oy + j * gap;
          let m = mobile ? 0.45 * smooth(0.1, 1, x / W) : smooth(0.4, 0.92, x / W);
          m *= smooth(0.02, 0.18, y / H) * (1 - smooth(0.78, 0.98, y / H));
          if (m > 0.01) pts.push({ x, y, m, s: hash(i, j) });
        }
      }
      draw();
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      const R = 160;
      for (let pass = 0; pass < 2; pass++) {
        ctx.fillStyle = pass ? acc : ink;
        for (let q = 0; q < pts.length; q++) {
          const p = pts[q];
          const n = Math.sin(p.x * 0.011 + t * 0.55) * Math.cos(p.y * 0.013 - t * 0.35) + 0.6 * Math.sin((p.x - p.y) * 0.007 + t * 0.4);
          const s = (n + 1.6) / 3.2;
          const isAcc = p.s > 0.982 && s > 0.55;
          if ((pass === 1) !== isAcc) continue;
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          let k = d2 < R * R ? 1 - Math.sqrt(d2) / R : 0;
          k *= k;
          const rad = 0.6 + s * s * 1.9 + k * 2.2;
          ctx.globalAlpha = Math.min(1, (0.1 + s * 0.42 + k * 0.5) * p.m * (isAcc ? 1.7 : 1));
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad, 0, 6.2832);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    }
    function frame(now) {
      raf = requestAnimationFrame(frame);
      if (now - last < 32) return; // ~30fps is plenty for a slow drift
      last = now;
      t += 0.032;
      mouse.x += (mouse.tx - mouse.x) * 0.15;
      mouse.y += (mouse.ty - mouse.y) * 0.15;
      draw();
    }
    const start = () => { if (!running && visible && !reduceMotion.matches && !document.hidden) { running = true; raf = requestAnimationFrame(frame); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    hero.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      const r = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - r.left; mouse.ty = e.clientY - r.top;
      if (mouse.x < -1000) { mouse.x = mouse.tx; mouse.y = mouse.ty; }
    });
    hero.addEventListener('pointerleave', () => { mouse.tx = mouse.ty = -1e4; mouse.x = mouse.y = -1e4; });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([en]) => { visible = en.isIntersecting; visible ? start() : stop(); }).observe(hero);
    }
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
    let rz = 0;
    const onResize = () => { cancelAnimationFrame(rz); rz = requestAnimationFrame(build); };
    if ('ResizeObserver' in window) new ResizeObserver(onResize).observe(canvas);
    else window.addEventListener('resize', onResize);
    window.addEventListener('themechange', () => { readColors(); draw(); });
    reduceMotion.addEventListener && reduceMotion.addEventListener('change', () => (reduceMotion.matches ? stop() : start()));

    readColors();
    build();
    start();
  }

  function initCase() {
    const el = $('#case');
    const panel = $('.case__panel', el);
    const body = $('#case-content');
    const count = $('#case-count');
    const baseTitle = document.title;
    const n = S.projects.length;
    let current = -1;
    let pushed = false;

    const indexOf = (slug) => S.projects.findIndex((p) => p.slug === slug);
    const hashSlug = () => { const m = location.hash.match(/^#work\/([A-Za-z0-9_-]+)$/); return m ? m[1] : null; };
    const setInert = (on) => ['#main', '#nav', '.footer', '#menu'].forEach((s) => { const x = $(s); if (x) x.inert = on; });

    function open(i) {
      const first = current === -1;
      const keepFocus = !first && el.contains(document.activeElement) && !body.contains(document.activeElement);
      current = i;
      const p = S.projects[i];
      body.innerHTML = caseHTML(p, i);
      count.textContent = `Project ${pad(i + 1)} / ${pad(n)}`;
      panel.scrollTop = 0;
      document.title = `${plain(p.title)} — ${plain(S.person.name)}`;
      if (first) {
        el.classList.add('is-open');
        el.setAttribute('aria-hidden', 'false');
        lockScroll(true);
        setInert(true);
      }
      if (!keepFocus) setTimeout(() => panel.focus({ preventScroll: true }), 30);
      announce(`Opened project: ${plain(p.title)}`);
    }
    function hide() {
      if (current === -1) return;
      const slug = S.projects[current].slug;
      current = -1;
      pushed = false;
      el.classList.remove('is-open');
      el.setAttribute('aria-hidden', 'true');
      setInert(false);
      lockScroll(false);
      document.title = baseTitle;
      const btn = $(`[data-open="${slug}"]`);
      if (btn) btn.focus({ preventScroll: true });
    }
    function close() {
      if (current === -1) return;
      if (pushed) { history.back(); return; } // hashchange will call hide()
      const slug = S.projects[current].slug;
      history.replaceState(null, '', location.pathname + location.search + '#work');
      hide();
      const btn = $(`[data-open="${slug}"]`);
      (btn ? btn.closest('.card') : $('#work')).scrollIntoView({ block: 'center' });
    }
    const goTo = (slug) => location.replace('#work/' + slug);
    const step = (d) => goTo(S.projects[(current + d + n) % n].slug);

    function route() {
      const slug = hashSlug();
      const i = slug ? indexOf(slug) : -1;
      if (i > -1) open(i);
      else hide();
    }

    document.addEventListener('click', (e) => {
      const b = e.target.closest('[data-open]');
      if (!b) return;
      e.preventDefault();
      pushed = true;
      location.hash = 'work/' + b.getAttribute('data-open');
    });
    el.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]')) close();
      else if (e.target.closest('[data-prev]')) step(-1);
      else if (e.target.closest('[data-next]')) step(1);
      else {
        const g = e.target.closest('[data-goto]');
        if (g) goTo(g.getAttribute('data-goto'));
      }
    });
    document.addEventListener('keydown', (e) => {
      if (current === -1) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
        step(e.key === 'ArrowRight' ? 1 : -1);
      }
    });
    window.addEventListener('hashchange', route);
    route();
  }

  function initForm() {
    const f = $('#contact-form');
    if (!f) return;
    const status = $('.form__status', f);
    const c = S.contact;
    const fields = {
      name: { el: $('#f-name'), test: (v) => v.trim().length >= 2, msg: 'Please enter your name.' },
      email: { el: $('#f-email'), test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()), msg: 'Please enter a valid email address.' },
      message: { el: $('#f-msg'), test: (v) => v.trim().length >= 10, msg: 'Please write a short message (at least 10 characters).' },
    };
    const setStatus = (msg, kind) => { status.textContent = msg; status.className = 'form__status' + (kind ? ' is-' + kind : ''); };
    const setErr = (key, msg) => {
      const fld = fields[key];
      fld.el.setAttribute('aria-invalid', msg ? 'true' : 'false');
      $('#' + fld.el.id + '-err').textContent = msg || '';
    };
    Object.keys(fields).forEach((k) => fields[k].el.addEventListener('input', () => {
      if (fields[k].el.getAttribute('aria-invalid') === 'true' && fields[k].test(fields[k].el.value)) setErr(k, '');
    }));

    f.addEventListener('submit', async (e) => {
      e.preventDefault();
      setStatus('');
      if (f.elements._gotcha.value) return; // bot trap
      let firstBad = null;
      Object.keys(fields).forEach((k) => {
        const ok = fields[k].test(fields[k].el.value);
        setErr(k, ok ? '' : fields[k].msg);
        if (!ok && !firstBad) firstBad = fields[k].el;
      });
      if (firstBad) { firstBad.focus(); return; }

      const name = fields.name.el.value.trim();
      const from = fields.email.el.value.trim();
      const message = fields.message.el.value.trim();
      const email = validEmail(c.email) ? c.email.trim() : '';

      if (has(c.formEndpoint) && safeUrl(c.formEndpoint)) {
        f.classList.add('is-sending');
        setStatus('Sending…');
        try {
          const res = await fetch(safeUrl(c.formEndpoint), { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(f) });
          if (!res.ok) throw new Error('HTTP ' + res.status);
          f.reset();
          setStatus("Thanks — your message has been sent. I'll get back to you soon.", 'ok');
        } catch (err) {
          setStatus(email ? `Sorry, something went wrong. Please email me directly at ${email}.` : 'Sorry, something went wrong. Please try again later.', 'err');
        } finally {
          f.classList.remove('is-sending');
        }
        return;
      }
      if (email) {
        const subject = `Portfolio enquiry from ${name}`;
        const text = `${message}\n\n— ${name}\n${from}`;
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
        setStatus(`Your email app should open with the message ready to send. If it doesn't, email me at ${email}.`, 'ok');
        return;
      }
      setStatus("This form isn't connected yet — add contact.email or contact.formEndpoint in js/content.js.", 'err');
    });
  }

  function initCopy() {
    document.addEventListener('click', async (e) => {
      const b = e.target.closest('[data-copy]');
      if (!b) return;
      const v = b.getAttribute('data-copy');
      let ok = false;
      try { await navigator.clipboard.writeText(v); ok = true; } catch (err) {
        const ta = document.createElement('textarea');
        ta.value = v; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { ok = document.execCommand('copy'); } catch (err2) { ok = false; }
        ta.remove();
      }
      if (!ok) return;
      b.innerHTML = I.check;
      announce('Email address copied');
      setTimeout(() => (b.innerHTML = I.copy), 1800);
    });
  }

  function initClock() {
    const el = $('[data-clock]');
    if (!el) return;
    let fmtr;
    try {
      fmtr = new Intl.DateTimeFormat('en-GB', { timeZone: S.person.timezone || 'Asia/Singapore', hour: '2-digit', minute: '2-digit', hour12: false });
    } catch (e) { el.parentElement.remove(); return; }
    const tick = () => (el.textContent = fmtr.format(new Date()));
    tick();
    setInterval(tick, 15000);
  }

  function placeholderBanner() {
    if (!HINTS) return;
    let count = 0;
    (function walk(v) {
      if (typeof v === 'string') { const m = v.match(/\[\[/g); if (m) count += m.length; }
      else if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === 'object' && !v.hidden) Object.keys(v).forEach((k) => walk(v[k]));
    })(S);
    console.info(`[portfolio] ${count} placeholder(s) left to fill in js/content.js`);
    try { if (sessionStorage.getItem('ph-banner') === 'hidden') return; } catch (e) { /* ignore */ }
    if (!count) return;
    const bar = document.createElement('div');
    bar.className = 'ph-banner';
    bar.innerHTML = `<span><strong>${count}</strong> placeholders to fill in — edit <code>js/content.js</code></span><button type="button" aria-label="Hide placeholder notice">✕</button>`;
    bar.querySelector('button').addEventListener('click', () => {
      bar.remove();
      try { sessionStorage.setItem('ph-banner', 'hidden'); } catch (e) { /* ignore */ }
    });
    document.body.appendChild(bar);
  }

  /* Section titles: each word rises into place when the title scrolls in. */
  function splitTitles() {
    $$('.section__title, .resume__title').forEach((el) => {
      let i = 0;
      const walk = (node) => {
        Array.from(node.childNodes).forEach((ch) => {
          if (ch.nodeType === 3) {
            const frag = document.createDocumentFragment();
            ch.textContent.split(/(\s+)/).forEach((part) => {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
              const w = document.createElement('span');
              w.className = 'wd';
              const inner = document.createElement('span');
              inner.style.setProperty('--i', i++);
              inner.textContent = part;
              w.appendChild(inner);
              frag.appendChild(w);
            });
            ch.replaceWith(frag);
          } else if (ch.nodeType === 1) walk(ch);
        });
      };
      walk(el);
      el.classList.add('is-split');
    });
  }

  /* Numbers count up from zero the first time they scroll into view. */
  function initCount() {
    const els = $$('[data-count]');
    if (reduceMotion.matches || !('IntersectionObserver' in window)) return;
    const put = (el, v) => { el.textContent = (el.dataset.prefix || '') + Math.round(v).toLocaleString('en-US') + (el.dataset.suffix || ''); };
    const run = (el) => {
      const target = Number(el.dataset.count);
      const t0 = performance.now();
      const step = (now) => {
        const k = Math.min(1, (now - t0) / 1400);
        put(el, target * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(step); else put(el, target);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { io.unobserve(en.target); run(en.target); } });
    }, { threshold: 0.5 });
    els.forEach((el) => { put(el, 0); io.observe(el); });
  }

  /* Project images tilt gently towards the cursor (mouse only, not with reduced motion). */
  function initTilt() {
    if (reduceMotion.matches || !window.matchMedia('(pointer: fine)').matches) return;
    $$('[data-tilt]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--rx', (y * -5).toFixed(2) + 'deg');
        el.style.setProperty('--ry', (x * 6).toFixed(2) + 'deg');
      });
      el.addEventListener('pointerleave', () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
    });
  }

  /* The badminton court: a continuous rally that starts when the court scrolls into
     view, pauses when it leaves, and can be paused by the visitor. */
  function initCourt() {
    const court = $('[data-court]');
    if (!court) return;
    const svg = $('.court__svg', court);
    const anim = $('#court-rally', court);
    const flight = $('#court-flight', court);
    const btn = $('[data-rally-toggle]', court);
    const label = $('[data-rally-label]', court);
    const countEl = $('[data-rally]', court);
    const wordEl = $('[data-rally-word]', court);
    const HALF = 1.4; // seconds per crossing (half of the 2.8 s loop)

    if (reduceMotion.matches || !anim || !svg || typeof anim.beginElement !== 'function' || typeof svg.pauseAnimations !== 'function') {
      court.classList.add('is-static');
      if (btn) btn.closest('.court__serve').remove();
      const sh = $('.court__shuttle', court);
      if (sh) { sh.setAttribute('transform', 'translate(670 -15)'); if (anim) anim.remove(); }
      return;
    }

    // Make the turnaround happen exactly at the far side: split time by arc length.
    try {
      const tmp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      tmp.setAttribute('d', 'M250 430C470 -170 870 -170 1090 430');
      svg.appendChild(tmp);
      const frac = tmp.getTotalLength() / flight.getTotalLength();
      tmp.remove();
      if (frac > 0 && frac < 1) anim.setAttribute('keyPoints', `0;${frac.toFixed(4)};1`);
    } catch (e) { /* keep the default split */ }

    let started = false, startAt = 0, userPaused = false, onScreen = false;
    svg.pauseAnimations();
    const sync = () => {
      const playing = started && onScreen && !userPaused && !document.hidden;
      if (playing) svg.unpauseAnimations(); else svg.pauseAnimations();
      court.classList.toggle('is-paused', started && userPaused);
    };
    const start = () => {
      if (started) return;
      started = true;
      court.classList.add('is-served');
      svg.unpauseAnimations();
      anim.beginElement();
      startAt = svg.getCurrentTime();
      sync();
    };
    setInterval(() => {
      if (!started || !countEl) return;
      const n = Math.max(0, Math.floor((svg.getCurrentTime() - startAt) / HALF));
      if (String(n) !== countEl.textContent) {
        countEl.textContent = n.toLocaleString('en-US');
        if (wordEl) wordEl.textContent = n === 1 ? 'rally' : 'rallies';
      }
    }, 150);

    btn && btn.addEventListener('click', () => {
      if (!started) { start(); return; }
      userPaused = !userPaused;
      btn.setAttribute('aria-pressed', String(userPaused));
      if (label) label.textContent = userPaused ? 'Play' : 'Pause';
      sync();
    });
    document.addEventListener('visibilitychange', sync);

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([en]) => {
        onScreen = en.isIntersecting;
        if (onScreen && !started) setTimeout(start, 700);
        else sync();
      }, { threshold: 0.3 }).observe(court);
    } else { onScreen = true; start(); }
  }
  /* --------------------------------------------------------------- boot */
  renderChrome();
  renderHero();
  renderAbout();
  renderWork();
  renderExperience();
  renderBeyond();
  renderResume();
  renderContact();
  renderFooter();

  splitTitles();
  initTheme();
  initNav();
  initReveal();
  initCount();
  initTilt();
  initCourt();
  initField();
  initCase();
  initForm();
  initCopy();
  initClock();
  placeholderBanner();

  // Content is rendered after the browser's initial jump to #section, so re-align.
  if (/^#[a-z]+$/.test(location.hash)) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView();
  }

  // A timer (not rAF) so the hero always appears, even in background tabs.
  setTimeout(() => document.body.classList.add('is-loaded'), 40);
})();
