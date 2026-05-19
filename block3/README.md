# Block 3 — Vibe Coding → Agentic Engineering

Attendee walkthrough for the Block 3 afternoon slot (1:00 – 2:30 PM, 90 min).

> **Thesis:** How working engineers move from vibe coding to agentic engineering. Same skill, new altitude.

## What you'll do

1. **Port** your Block 2 Project Inspector skill into Pi
2. **Run** it against a Nuxt-shaped fixture and see it produce a confidently-incomplete answer
3. **Install** a verifier skill that applies a different lens (security / supply-chain) to the same input
4. **Wire** a Pi extension (`.ts`) that auto-fires the verifier after the inspector finishes — and register a `/audit` slash command as the explicit, reliable alternative
5. **Drop in** `AGENTS.md` and `SYSTEM.md` — Pi's project-scoped hygiene primitives
6. **Watch** the multi-lens showcase: three verifiers in parallel, a deliberator merging findings

## Prereqs (verify before lunch)

- Pi installed: `pi --version` returns cleanly
- A second CLI for verification: Gemini CLI authed against Google, OR Codex CLI authed against your OpenAI key

If either prereq is missing, raise your hand during the lunch break — five minutes of setup is faster than fifteen minutes of debugging during the lab.

## Files you'll touch

| Path | What |
|------|------|
| `.pi/skills/project-inspector/SKILL.md` | Where you copy your Block 2 skill |
| `.pi/skills/project-verifier/SKILL.md` | Pre-staged — the security/CVE lens |
| `.pi/extensions/inspect-verify.ts` | Pre-staged — the hook + slash command |
| `fixtures/agentic-target-sample/` | The Nuxt-shaped target with the planted failure |
| `AGENTS.md`, `SYSTEM.md` | Pre-staged at repo root — project-scoped Pi config |

## The 90-minute shape

| Time | Beat | Mode |
|------|------|------|
| 1:00 – 1:05 | Frame | Mirrored |
| 1:05 – 1:25 | Port Project Inspector into Pi | YOUR TURN |
| 1:25 – 1:30 | The failure — what the briefing doesn't say | Mirrored |
| 1:30 – 1:50 | Verifier agent enters | Mixed |
| 1:50 – 2:05 | Hooks — Pi extension | Mixed |
| 2:05 – 2:15 | Hygiene — AGENTS.md + SYSTEM.md | Mixed |
| 2:15 – 2:23 | Showcase — pattern extended (3 verifiers + deliberator) | Demo |
| 2:23 – 2:27 | Showcase — roundtable cameo | Demo |
| 2:27 – 2:30 | Q&A | Conversation |

## What you take home

A repo you can use as a template:

- One inspector skill + one verifier skill + one extension that wires them
- An `AGENTS.md` and `SYSTEM.md` you can adapt for any of your own projects
- The composition pattern: *no single skill catches everything; that's why we compose*

## What to do Monday

Pick one skill from your own work where the output is *technically correct but operationally incomplete* — and build the verifier that catches what it misses. Same pattern. Same primitives. Different domain.
