# AGENTS.md — AI Engineering Workshop

> Project instructions loaded automatically by Pi (`pi.dev`) at session start. Pi reads `AGENTS.md` from `~/.pi/agent/`, every parent directory of the cwd, and the cwd itself — and concatenates them in that order. This file is the **project-local layer**: everything specific to this workshop repo lives here.

## What this repo is

Workshop materials for *AI Engineering: From Prompt Architecture to Production Infrastructure* — VueConf US 2026, Atlanta, 2026-05-19. Four blocks (see [README.md](README.md)). Block 3 is the Pi / agentic-engineering block; the `.pi/` directory below holds its skills + extensions.

## Where things live

| Path | What |
|------|------|
| `.pi/skills/project-inspector/` | Block 2 artifact, ported into Pi for Block 3 |
| `.pi/skills/project-verifier/` | Block 3 security/CVE lens — primary lab skill |
| `.pi/skills/architecture-verifier/` | Block 3 showcase stub (architectural critique lens) |
| `.pi/skills/performance-verifier/` | Block 3 showcase stub (performance/bundle lens) |
| `.pi/extensions/inspect-verify.ts` | Block 3 extension — wires inspector → verifier; registers `/audit` |
| `fixtures/agentic-target-sample/` | Block 3 dramatic-failure target — Nuxt-shaped, vulnerable deps planted |
| `fixtures/{nuxt,monorepo,vite-react,leaky-secret}-sample/` | Block 2 eval fixtures |
| `prompts/project-inspector-v5.txt` | Canonical Block 1 fallback prompt |
| `evals/` | Block 2 eval suite (with planted non-discriminating assertion) |
| `bifrost/`, `nuxt-app/` | Block 4 infrastructure + Vue/Nuxt integration target |

## Conventions when operating in this repo

- **Skills are the unit of agent capability.** A new lens (security / architecture / performance / etc.) lives as a new skill under `.pi/skills/<name>/`. Don't bury new behavior in extension code if it could be a skill — extensions wire skills; skills implement reasoning.
- **Extensions wire, skills reason.** Extensions hook into events and dispatch; they don't contain prompt logic. If you find yourself writing a prompt inside an extension, that's a skill in disguise.
- **One JSON shape per verifier.** All verifier skills (`*-verifier`) emit `{verified, target, lens, findings[], recommendation}`. Don't drift the envelope — the deliberator pattern in Block 3's showcase relies on consistent shape.
- **Never echo secrets.** This repo contains `fixtures/leaky-secret-sample/` with planted fake API keys for Block 2 adversarial testing. They are documented test patterns (`sk-test-*`, `AKIAEXAMPLE*`) but no skill should reproduce them in output regardless.
- **Honest scoping.** On the small workshop fixtures (≤10 files each), don't manufacture findings to look thorough. A clean lens is a valid result.

## What NOT to load into context

Pi auto-discovers skills and extensions. Be deliberate about what runs:

- `node_modules/`, `.nuxt/`, `.output/` — generated; never load
- `bifrost/data/` (if present at workshop time) — runtime state; never load
- `nuxt-app/` during Block 3 — out of scope; loading it inflates context unnecessarily
- Session history under `~/.pi/agent/sessions/` — Pi manages this; don't reference

If running `--tools read,bash,grep,find,ls` (the typical Block 3 toolset), the `find` / `grep` defaults will naturally skip these — but if you broaden tools, add explicit exclusions.

## Workshop-day operational notes

- **Default provider:** `pi` defaults to Google (Gemini). Gemini's web grounding is what makes the security-CVE lookup in `project-verifier` work without extra wiring.
- **Print mode (`-p`) caveat:** `--print` exits after one `agent_end`. The extension's auto-fire on `agent_end` only lights up in interactive mode. The `/audit` slash command works in both modes — use it when scripting.
- **Pre-staged extensions:** `.pi/extensions/inspect-verify.ts` is auto-loaded by Pi when run from the repo root. Override with `-e <path>` if loading from elsewhere.
