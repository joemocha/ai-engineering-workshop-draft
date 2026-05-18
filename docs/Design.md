# Design.md — Workshop Site

> [!info] This file is mirrored in two places — keep them in sync
> **Repo (this file — canonical for agents working in the codebase):** `/Users/martinrojas/Documents/03 Code/ai-engineering-workshop/docs/Design.md`
> **Vault (canonical for agents working in the Obsidian planning context):** `[Obsidian Vault]/02 Areas/203 Talks/2025-10 Workshop - AI in Production/slides/DESIGN.md`
>
> The vault version's frontmatter declares the **brand bible** — Neo-Industrial Brutalist tokens, the original Kinetic Monograph reference. The vault version also carries the same implementation conventions below. When you change one file, change the other.

**Scope:** the workshop companion website that lives in this `/docs/` folder. Authoritative reference for the design system, component patterns, interaction behaviors, and conventions used by every page.

**When to update this:** any time a design decision is made, a new component is introduced, a convention shifts, or a load-bearing rationale is established. Future agents and future-Martin read this *first* before touching the site.

**Source of truth ranking** when answering "how should this look or work?":
1. This document (Design.md) / its vault mirror (DESIGN.md) — design system + conventions
2. The slide-flow markdown specs in the Obsidian vault — content + pedagogy
3. The HTML pages themselves — implementation

If these disagree, this doc is right and the others need updating.

---

## Design philosophy

**Brutalist editorial.** Hard black borders, offset drop shadows, dense type, monospace tags. Inspired by the "Kinetic Monograph" reference samples — thick `4px` borders + offset shadows `8px 8px 0 0 #221610` are the load-bearing visual signature. Subtle hover states (translate + shadow loss) when interactive. No gradients, no glassmorphism, no rounded corners beyond `0.25rem`.

**Information-dense, projector-friendly.** The site is used in two modes simultaneously: projected on a workshop screen *and* viewed by attendees on their laptops. Type sizes assume both audiences. Code blocks are dark with high contrast so they read at 12 feet.

**Tablet+ only.** Minimum viewport: 768px. Below that, a notice shows; the layout is not designed for phones. The workshop assumes attendees follow along on a laptop; the projector is at desktop sizes.

**Copy-paste is a first-class feature.** Every code block has a copy button. Every command, prompt, or snippet attendees might re-use lives in a copyable block. No code-as-image.

---

## Color system

Material-style token names; values defined in `assets/tailwind-config.js`. Use Tailwind classes (e.g. `bg-primary`, `border-border-primary`) — don't inline hex.

### Primary palette

| Token | Hex | Where it's used |
|---|---|---|
| `primary` | `#a04100` | Burnt orange. Load-bearing actions, ★ markers, focused nav, the brand chip background, accent borders on critical content. |
| `primary-container` | `#fe6b00` | Brighter orange. Highlights, bridge slides ("after lunch"), call-out backgrounds. |
| `on-primary` | `#ffffff` | Text on primary backgrounds. |
| `primary-fixed` / `primary-fixed-dim` | `#ffdbcc` / `#ffb693` | Soft orange tints — light overlays, kbd backgrounds. |

### Border & background

| Token | Hex | Where it's used |
|---|---|---|
| `border-primary` | `#221610` | Deep brown-black. **The only border color.** All `border-4` lines. Brand-chip background. Code-block borders. |
| `background` / `surface` | `#fbf9f9` | Page background. Card default background. |
| `background-light` | `#f8f6f6` | Footer background. Demo-block background. |
| `surface-container-lowest` | `#ffffff` | Highest-emphasis cards (used sparingly — Hero variant, day-shape table). |
| `surface-container-low` | `#f5f3f3` | Slightly recessed surfaces. |
| `surface-variant` | `#e4e2e2` | Subtle backgrounds, alternating table rows, neutral chips. |

### Accents

| Token | Hex | Where it's used |
|---|---|---|
| `secondary-container` | `#f6ded3` | Warm pale peach. Context chips (BLOCK 1 · …), speaker-notes background. |
| `tertiary` / `tertiary-container` | `#00629f` / `#009efc` | Cool blue. Demo-block accent border. "Copied" state on copy buttons. |
| `error` / `error-container` | `#ba1a1a` / `#ffdad6` | Reserved for errors / the small-viewport notice. |

### Grid background pattern

Every page has a faint radial-dot grid pattern via `.bg-grid` (24px spacing). Defined in `assets/styles.css`. Subtle — adds the "blueprint" feel without competing with content.

---

## Typography

Two families, loaded from Google Fonts:

- **Public Sans** — display + body (500, 700, 800, 900 weights)
- **JetBrains Mono** — monospace (700 weight only)

### Type scale

Tokens defined in `tailwind-config.js`. Use the Tailwind classes (`font-display-xl text-display-xl`, etc.) — do not eyeball pixel values.

| Token | Size / weight | Where it's used |
|---|---|---|
| `display-xl` | 60px / 900 / -0.05em / 1.1 | Page hero titles (Block name, topic name). Uppercased. |
| `display-xl-mobile` | 40px / 900 / -0.05em / 1.1 | Same on tablet. |
| `headline-md` | 18px / 700 / 1.4 | Nav links, secondary section labels (uppercased). |
| `body-lg` | 18px / 700 / 1.5 | Lead paragraphs, slide descriptions. |
| `body-sm` | 14px / 500 / 1.6 | Default body text, captions, fine details. |
| `label-caps` | 12px / 800 / 0.2em letter-spacing / 1.2 | Reserved for small uppercased labels. Currently underused. |
| `mono-tag` | 13px / 700 / 0.05em / 1.0 | All status chips, brand chip, eyebrow labels, code labels. The signature font of the site. |

### Component-specific type

Defined in `assets/styles.css` (not Tailwind tokens):

- `.slide-title` — 28px / 800 / uppercased / -0.02em — used for slide H3s
- `.beat-header h2` — 36px / 900 / uppercased / -0.03em — used for beat H2s

If you need a new typographic element, prefer extending these patterns over inventing new sizes.

### Type rules

- **Uppercase only on tags, titles, and nav.** Body text stays sentence case.
- **Monospace = "this is a token / chip / code."** Don't use it for prose.
- **No italics for emphasis.** Use `<strong>` (bold) or `<em>` (only inside speaker-notes blocks for spoken text).

---

## Spacing & layout

Tokens defined in `tailwind-config.js`:

| Token | Value | Notes |
|---|---|---|
| `base` | 4px | Atomic unit; rarely used directly. |
| `gutter` | 24px | Grid gutter, gap between cards. |
| `edge-margin-mobile` | 20px | Page padding below 768px (rarely seen). |
| `edge-margin-desktop` | 40px | Page padding at tablet+ sizes. |
| `container-max` | 1024px | Max content width across all pages. |

**Always use the container.** Wrap top-level content in `max-w-container-max mx-auto`. Don't go wider.

**12-column grid for topic pages.** Topic pages use `grid-cols-12` with a 3-column sticky TOC sidebar (`md:col-span-4 lg:col-span-3`) and 9-column content (`md:col-span-8 lg:col-span-9`).

**Vertical rhythm.**

- Page sections: `mb-10` between major sections.
- Beats: `margin-top: 64px` on `.beat-header` separates beats.
- Slides within a beat: `margin-top: 24px` between `.slide-card` siblings (via `.slide-card + .slide-card`).
- Speaker notes / demo blocks: `margin-top: 16px` after the last slide in a beat.

---

## Component library

Each component below is the canonical pattern. If you need to deviate, document the deviation in this file before shipping.

### Top nav (`.top-nav`)

Persistent across every page. Contains:

- **Brand chip** on the left: `CORE_WORKSHOP_v1.0` in mono-tag, white-on-orange. Links to `index.html`.
- **Section nav** (tablet+): Workshop / Reference / About. Underline on active section (orange border-b-4).
- **Right slot:** currently empty (was the press-s hint; removed by request 2026-05-17). Reserved for future indicators.

The persistent banner that says `SPEAKER NOTES MODE — press s to hide` only appears when notes mode is active. It's the **only** in-band reminder of the keyboard shortcut. Don't add a second one.

### Speaker-notes banner (`.notes-mode-banner`)

Top-right fixed banner. Visible only when `body.show-notes` class is set. Confirms notes are visible and reminds how to hide. Do not duplicate.

### Hero card

Large `border-4` card with offset shadow. Houses the page title (display-xl), an eyebrow label (mono-tag), and a lead paragraph (body-lg).

**Variants:**
- **Standard:** `bg-surface` (default).
- **Critical-path topic:** `bg-primary-container/15` — used for Topics 2.2 and 1.2 where the load-bearing HO lives.

### Slide card (`.slide-card`)

The atomic unit of slide content within a beat.

```html
<article class="slide-card">
  <span class="slide-label">Slide 1 / N · Subtitle</span>
  <h3 class="slide-title">SLIDE HEADING</h3>
  <!-- bullets, table, code, etc. -->
</article>
```

**Conventions:**
- The `slide-label` is mono-tag, uppercased: `"Slide 1 / N · short descriptor"`.
- The `slide-title` is uppercased, sentence-shape title-case.
- Content is one of: `<ul class="slide-bullets">`, `<table class="slide-table">`, a `<div class="code-block">`, a `<blockquote>`, or a combination.
- Maximum ~5 bullets per slide. If more, split into another slide.

**Variants:**
- **Standard:** default styling.
- **Critical-path beat:** override border + shadow to orange (`border-color:#a04100; box-shadow:8px 8px 0 0 rgba(160,65,0,1)`). Used on slides inside beats with `.beat-critical`.
- **Dark slide:** `background:#221610; color:#fbf9f9` for emphasis moments (memorized teaching lines, recap anchors). Use sparingly — typically once per beat at most.
- **Bridge slide:** `background:#fe6b00; color:#221610` for "after lunch" or "next session" handoffs.

### Slide bullets (`.slide-bullets`)

Custom list with orange triangle markers (`▸`). Strong text in bullets gets primary orange color.

```html
<ul class="slide-bullets">
  <li>Plain bullet</li>
  <li><strong>Emphasized phrase</strong></li>
</ul>
```

For numbered lists inside `.slide-bullets`, add inline style `list-style:decimal;padding-left:24px`.

### Slide table (`.slide-table`)

White background with deep-brown borders + dark header row + alternating peach-tinted even rows. Mono-tag uppercased headers.

```html
<table class="slide-table">
  <thead><tr><th>Header</th><th>Header</th></tr></thead>
  <tbody><tr><td>Cell</td><td>Cell</td></tr></tbody>
</table>
```

### Code block (`.code-block`)

Dark theme block with header strip + copy button (auto-attached by JS).

```html
<div class="code-block" data-label="LABEL TEXT"><pre><code>contents
go here</code></pre></div>
```

**Conventions:**
- Every code block must use `.code-block` class (not just `<pre>` alone).
- Set `data-label="..."` on the wrapper — appears in the header strip. Uppercase mono-tag short label.
- Use HTML entities for special chars (`&amp;` for `&`, `&lt;` for `<`, `&gt;` for `>`).
- Multi-line content: linebreaks inside `<pre><code>` are preserved.
- The copy button is **auto-attached on `DOMContentLoaded`** by `assets/script.js`. Do not add it manually.

### Inline code

Use `<code>` inside paragraphs / list items / table cells. Styled with peach background + thin outline-variant border. Keep inline code short (~30 chars max) — anything longer goes in a `.code-block`.

### Beat section (`.beat`)

Each beat is a `<section>` with a unique anchor:

```html
<section id="beat-X-Y-Z" class="beat">
  <header class="beat-header">
    <span class="beat-number">X.Y.Z</span>
    <h2>Beat title</h2>
    <div class="meta-row">
      <span class="meta-chip">N min</span>
      <span class="meta-chip">Lecture | Hands-on | Discussion</span>
      <!-- optional: -->
      <span class="meta-chip critical">LOAD-BEARING — DO NOT CUT</span>
    </div>
  </header>

  <article class="slide-card">…</article>
  <article class="slide-card">…</article>

  <aside class="notes-block">
    <span class="block-label">Speaker notes</span>
    <p>…</p>
  </aside>

  <aside class="demo-block">
    <span class="block-label">Demo piece</span>
    <p>…</p>
  </aside>
</section>
```

**Anchor naming convention:** `beat-{block}-{topic}-{beat}` — e.g. `beat-1-2-5`, `beat-2-1-4`. Block 2 Topic 2.2 beats use letter suffixes (`beat-a` through `beat-g`) because they map to the Block 2 spec's letter labels.

### Critical / load-bearing beats (`.beat-critical`)

A beat that "must land" gets:

1. `class="beat beat-critical"` on the section
2. `style="border-bottom-color:#a04100"` on `.beat-header`
3. `style="background:#a04100"` on the `.beat-number` chip
4. `style="color:#a04100"` on the H2 heading
5. A `<span class="meta-chip critical">LOAD-BEARING — DO NOT CUT</span>` chip
6. A short italic paragraph below the meta-row explaining why
7. Slide cards inside override border + shadow to orange (see `.slide-card` variants)
8. In the TOC sidebar, the entry gets `style="background:#a04100;color:#fff;font-weight:800"` + a `★` suffix

This treatment is reserved for beats whose absence collapses the workshop's pedagogical claim. Current critical beats: 1.2.5, 1.2.7, 1.3.3, 2.2.F.

### Speaker-notes block (`.notes-block`)

Hidden by default. Revealed when `body.show-notes` is set (via the `s` keyboard toggle or `?notes=1` URL param).

```html
<aside class="notes-block">
  <span class="block-label">Speaker notes</span>
  <p>What to say. Use <em>italic</em> for spoken lines (rendered with a peach highlight).</p>
</aside>
```

**Conventions:**
- Use `<em>` only for direct quotes of what the speaker says.
- Bold `<strong>` for stage directions (e.g., `<strong>Pause:</strong>`, `<strong>Slide 2:</strong>`).
- Memorized lines marked explicitly: *"…(memorize this)…"*.

### Demo-piece block (`.demo-block`)

The interactive / live-delivery section. Holds commands, file paths, click sequences, things attendees actually do.

```html
<aside class="demo-block">
  <span class="block-label">Demo piece</span>
  <p>What happens here.</p>
  <div class="code-block" data-label="COMMAND"><pre><code>…</code></pre></div>
</aside>
```

**Auto-hide behavior:** if a demo block contains only one `<p>` element (after the label) and that paragraph starts with `"None"` or `"N/A"`, it is automatically hidden by `assets/script.js`. Beats genuinely without a demo can be written `<p><em>None.</em></p>` and they'll disappear at runtime.

**Escape hatch:** add class `is-empty` to force hide regardless of content. Or omit the block entirely.

### Beat TOC sidebar (`.beat-toc`)

Sticky sidebar listing all beats in the topic. Anchor links scroll to each beat.

```html
<nav class="beat-toc">
  <span class="toc-label">Beats in this topic</span>
  <ol>
    <li><a href="#beat-X-Y-Z"><span class="toc-num">X.Y.Z</span>Beat name</a></li>
    <!-- critical beat: -->
    <li><a href="#beat-X-Y-Z" style="background:#a04100;color:#fff;font-weight:800">
      <span class="toc-num" style="color:#ffb693">X.Y.Z</span>Beat name ★
    </a></li>
  </ol>
</nav>
```

Sits in `col-span-12 md:col-span-4 lg:col-span-3`. `scroll-margin-top: 96px` on `.beat` ensures anchor jumps don't hide under the sticky top nav.

### Chips & tags

Use `mono-tag` font with `2px` border. Variants:

| Use case | Pattern |
|---|---|
| Context (page header) | `bg-secondary-container` |
| Active state / call to action | `bg-primary text-on-primary` |
| Time / neutral fact | `bg-surface-variant` |
| Critical | `bg-primary text-on-primary` (in beat headers, with explicit "LOAD-BEARING" text) |

### Bottom prev/next nav

Every topic page ends with:

```html
<nav class="border-t-4 border-border-primary mt-16 pt-6 flex justify-between items-center">
  <a href="…" class="…surface-variant…">← Previous label</a>
  <span class="…">Topic N of N</span>
  <a href="…" class="…primary…">Next label →</a>
</nav>
```

The center label tells you where you are in the sequence. Match this pattern exactly on new pages.

---

## Interaction patterns

All wiring lives in `assets/script.js`.

### Speaker-notes toggle (`s` key)

- Press `s` anywhere (outside an input) to toggle `body.show-notes`.
- State persists in `localStorage["workshop:notes"]`.
- Adding `?notes=1` to any URL forces notes on at load. Bookmark-able presenter view.
- The notes-mode banner is the only in-band reminder of the shortcut.

### Arrow key navigation

If the `<body>` has `data-prev="…"` and/or `data-next="…"`, the JS binds `←` and `→` keys to navigate. Set both on every topic page:

```html
<body … data-prev="block-X-prev.html" data-next="block-X-next.html">
```

Ignored when typing in inputs, when modifier keys are held.

### Copy buttons

Auto-attached to every `.code-block` on load. Reads `data-label` for the header strip text. Click → copies `innerText` (rendered text, not HTML) to clipboard. Button briefly flashes "Copied!" in blue.

### Empty demo-block auto-hide

Demo blocks containing only `<p>None…</p>` or `<p>N/A…</p>` (single child after the label) are hidden. Add `class="is-empty"` for explicit forced hiding.

---

## Content patterns

These are content conventions every beat / page follows. Future agents authoring new pages should match these exactly.

### Beat anatomy

Every beat has:

1. **Header** — number, title, meta-chips (time + mode + optional critical chip)
2. **Slides** — 1 to ~6 `.slide-card` articles (more than 6 suggests the beat should be split)
3. **Speaker notes** — always present, even if minimal
4. **Demo piece** — always present; auto-hides if empty

### Critical-beat marker convention

A beat is critical (load-bearing) iff its absence breaks the workshop's pedagogical claim. Currently: 1.2.5, 1.2.7, 1.3.3, 2.2.F. Visual treatment described under "Critical / load-bearing beats" above. The threshold for promoting a beat to critical is high — most beats are *not* critical.

### Placeholder convention

When content depends on something captured during dry-run, use bracket notation: `[X]`, `[N]`, `[exact text]`. Add a note below the slide explaining what to fill in:

> `<p class="font-mono-tag text-mono-tag text-on-surface-variant mt-4">[X] / [Y] / [N] filled from dry-run capture before live delivery</p>`

### Dry-run capture markers

When a slide expects a screenshot or text capture from the dry-run, the demo block calls it out explicitly:

> **📸 Dry-run capture target:** screenshot of X. Lives at `assets/blockN-name.png`.
> **📋 Dry-run text capture:** exact wording of Y. Paste into Slide N quote block.

### Asset path convention

Captured artifacts go in `assets/blockN-descriptor.png` (e.g., `block2-analyzer-flag.png`). Pre-existing `prompts/` folder on the site is for static reference prompts.

---

## File structure

```
docs/
├── Design.md                      ← this file
├── index.html                     ← workshop home + nav + block cards
├── block-1-foundations.html       ← Topic 1.1
├── block-1-prompts.html           ← Topic 1.2 (incl. load-bearing 1.2.5 + 1.2.7)
├── block-1-skills-tools.html      ← Topic 1.3 (incl. load-bearing 1.3.3)
├── block-2-orientation.html       ← Topic 2.1
├── block-2-iteration.html         ← Topic 2.2 (incl. load-bearing Beat F)
├── block-2-optimizer.html         ← Topic 2.3
├── block-3-*.html                 ← Sam's block — not yet built
├── block-4-*.html                 ← Block 4 — not yet built
└── assets/
    ├── tailwind-config.js         ← design tokens (shared by every page)
    ├── styles.css                 ← component CSS + grid bg + utilities
    └── script.js                  ← notes toggle + copy buttons + arrow nav + empty-demo hide
```

**Naming convention:** `block-N-shortname.html`. Shortname is the topic theme (orientation, iteration, optimizer, foundations, prompts, etc.). One file per topic; each file is `1024px`-wide content with multiple beats.

**No build step.** Tailwind CDN + shared config script. Each HTML page is independently servable.

---

## Conventions for adding a new page

Use Block 2 / Topic 2.1 as the template. Every new topic page should:

1. **Frontmatter / head** — same `<head>` block (Tailwind CDN, shared `tailwind-config.js`, Google Fonts, `styles.css`). Title format: `Block N / Topic N.N — <title>`.
2. **Body data attrs** — set `data-prev` and `data-next` to the surrounding pages for arrow nav.
3. **Small-viewport notice + grid overlay + top nav + notes banner** — copy verbatim.
4. **Breadcrumb chip** — `BLOCK N · <BLOCK NAME>` + time/duration metadata mono-tag.
5. **Hero card** — eyebrow + display-xl title + lead body-lg. Critical-path topics use the orange-tinted background variant.
6. **Two-column grid** — `grid-cols-12 gap-gutter` with sidebar (TOC) + content. Standard widths: TOC `md:col-span-4 lg:col-span-3`, content `md:col-span-8 lg:col-span-9`.
7. **Beats** — one `<section id="beat-X-Y-Z" class="beat">` per beat. Follow the beat anatomy convention.
8. **Bottom prev/next nav** — match the pattern from existing topic pages.
9. **Script tag at end of body** — `<script src="assets/script.js"></script>`.

After authoring:
- Verify the page returns 200 over HTTP (`python3 -m http.server` from `docs/` then `curl`).
- Verify the beat anchors all resolve via the TOC.
- Verify copy buttons work on every code block.
- Verify `s` toggles speaker notes.
- If the page is reachable via the block grid on `index.html`, update the relevant block card from placeholder to live link.

---

## Decisions & rationale

Recorded so future changes know the *why*, not just the *what*. Add entries here when significant decisions are made.

### Why brutalist editorial (not minimalist or material)
The reference samples in the original design source establish the aesthetic. It also serves the function: thick borders + offset shadows give every element clear hierarchy at projector distance. Generic AI-generated UI tends toward soft-and-rounded — this is deliberately the opposite.

### Why no mobile (≥768px only)
The workshop is for projection + laptop follow-along. Designing for phones would compromise the projector-friendly density. The small-viewport notice gracefully degrades.

### Why hidden speaker notes by default (not visible)
Attendees follow along on their laptops. They shouldn't see the prompts the instructor is reading from. Presenter gets notes via `s` toggle or `?notes=1` bookmark.

### Why copy buttons on every code block (auto-attached)
Workshop sessions are dense; attendees need to paste commands fast. Manual `<button>` markup per block would be brittle. JS auto-attachment guarantees every code block is copyable.

### Why `claude /plugin list` is banned (Block 2 Beat 2.1.4 + Prerequisites)
`/plugin` is an interactive Claude Code REPL command, not a CLI subcommand. It can't be piped to `grep`. The canonical verify uses `installed_plugins.json` on disk:

```bash
grep -q '"skill-creator@' ~/.claude/plugins/installed_plugins.json \
  && echo "✓ skill-creator installed" \
  || echo "✗ NOT installed"
```

Use this exact one-liner on any page that verifies plugin installation.

### Why empty demo blocks auto-hide (not manually deleted)
The slide-flow markdown source-of-truth includes a `Demo piece` section for every beat with "n/a" for lecture-only beats. The HTML mirrors that structure for source-of-truth consistency. The JS hides the empty ones at runtime. If a beat later gains a real demo, replacing the "None" content makes it auto-appear — no structural change needed.

### Why critical beats get a distinct visual treatment
Triage during live delivery requires instant visual recognition of "cannot cut." The orange-border + ★ TOC marker + LOAD-BEARING chip combination is unmistakable at projector distance. The threshold for promoting a beat to critical is intentionally high — overuse dilutes the signal.

### Why two presenter modes (notes off / notes on) instead of separate URLs
Same URL, same printable PDF, same shareable link. Keyboard toggle is fast for live use; `?notes=1` is bookmarkable for presenter rehearsal.

### Why Block 1 HO is AI-as-Coach (not manual layer walk)
Decided 2026-05-17. The pedagogical claim shifted: *"AI will write your prompts. Knowing what makes up a prompt and when each piece earns its keep is the durable skill."* The HO uses an interactive optimizing prompt that attendees paste into any AI chat (Claude / Gemini / ChatGPT). The 5-layer model survives as vocabulary + judgment framework, not as a manual recipe.

---

## Open questions / future work

Items not yet decided. Discuss + record decision here when resolved.

- **Block 3 page treatment.** Sam owns Block 3 content. The site should have at least a placeholder page that's consistent with the design language. Open: does Sam author HTML himself, do we provide a stub for him to fill, or do we wait for his content and Martin authors?
- **Block 4 build.** Not yet built. ~21 beats, densest of all four blocks. Q&A floor at 15 min protected.
- **Print stylesheet.** A skeletal `@media print` block exists. Has not been tested. Workshop attendees may want to print their copy of slide content.
- **Dark mode.** Not implemented. The brutalist aesthetic could plausibly invert (dark bg + orange accents). Out of scope until requested.
- **Analytics / telemetry.** None. Workshop site is static.
