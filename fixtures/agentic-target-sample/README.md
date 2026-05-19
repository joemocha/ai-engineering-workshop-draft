# agentic-target-sample

> ⚠️ **Instructor-facing.** Do NOT share this README with attendees pre-workshop. The Block 3 dramatic-failure beat depends on attendees not knowing what's planted.

A Nuxt-shaped fixture used as the **Block 3 "skills can lie" target.** Structurally identical to `nuxt-sample/`; differs only in `package.json`, which pins a stack of well-documented vulnerable transitive dependencies.

## Structure

```
agentic-target-sample/
├── package.json         # Nuxt 3 deps + planted vulnerable transitives
├── nuxt.config.ts       # Nuxt configuration
├── pages/
│   ├── index.vue
│   └── about.vue
├── components/
│   └── Header.vue
└── composables/
    └── useExample.ts
```

## The planted vulnerabilities

| Dep | Pinned | Advisory | Severity |
|-----|--------|----------|----------|
| `axios` | `0.21.0` | CVE-2020-28168 (SSRF) | High |
| `lodash` | `4.17.20` | CVE-2021-23337 (command injection) | High |
| `minimist` | `1.2.5` | CVE-2021-44906 (prototype pollution) | Critical |
| `serialize-javascript` | `3.0.0` | CVE-2020-7660 (XSS) | High |

All advisories are public, stable, and not at risk of expiry. None of the planted versions are runtime-active in the fixture's code — they exist only as declared dependencies.

## What Project Inspector says (the lie)

Project Inspector v5 confidently produces a clean Nuxt-3 architectural briefing:

- Framework: Nuxt 3
- Entry points: `nuxt.config.ts`, `pages/index.vue`, `pages/about.vue`
- Data-flow trace through page → component → composable
- `key_dependencies`: likely lists most or all of `nuxt`, `vue`, `vue-router`, `typescript`, `axios`, `lodash`, `minimist`, `serialize-javascript`

**The lie isn't omission — it's lensing.** Inspector lists the dependency *names* (per its spec) but reports **no version context** and **no security posture**. Its output schema is `["<package name>", ...]` — names only. A reader looking at Inspector's briefing has no signal that four of those deps are pinned at exact versions with public high/critical CVEs.

That's the failure mode this fixture exercises: not that v5 is broken, but that v5's spec doesn't ask it to evaluate security posture. The discipline of *agentic engineering* is composing past that limit, not training one skill to do everything.

## What Project Verifier catches

`.pi/skills/project-verifier/` reads `package.json`, identifies the pinned exact versions, and uses Gemini's web grounding to look up CVE advisories per pinned version. Output flags all four planted vulns with severity and advisory ID.

## Why no lockfile

The fixture honors the existing fixtures-README size constraint (≤10 files, ≤20 KB). A real `package-lock.json` for a Nuxt project would blow the budget. The verifier doesn't need one — it operates on declared versions in `package.json` plus web-grounded CVE lookup, which is the lesson: *a verifier can use a different lens (the web, an external CLI, a different model) to catch what your local-only skill cannot.*

## Pre-workshop verification checklist

- [ ] Run Project Inspector v5 against this fixture; confirm it produces a clean briefing with no security mentions in ≥9/10 runs
- [ ] Run Project Verifier (via Pi + Gemini CLI) against the same fixture; confirm all 4 pinned vulns are flagged in ≥9/10 runs
- [ ] Capture before/after screenshots for the slide deck (Inspector output side-by-side with Verifier output)
- [ ] Confirm file size remains within fixture conventions (`du -k .`)
