# Prereqs to send to Martin — Block 3 additions for attendee email

> **Use:** Paste the block below into Slack / email to Martin so the attendee prereq message can be updated. Date generated: 2026-05-17.

---

**Subject suggestion:** Block 3 prereqs to add to the attendee email
s
Hey Martin —

Block 3 lab needs two additions to the attendee prereq email. Both are free / no signup beyond accounts most attendees already have. Adding these brings Block 3 in line with Blocks 1, 2, 4 on setup-before-arrival.

**Two additions, append to the existing prereq list:**

> - **Pi installed** (`pi.dev`). Install via `bun install -g @earendil-works/pi-coding-agent`. Verify with `pi --version` — should return cleanly. Pi is Block 3's runtime/orchestrator (minimal terminal coding harness, defaults to Gemini).
> - **A secondary CLI for verification.** Either:
>     - **Gemini CLI** authenticated with a Google account (primary — Pi defaults to Gemini, and Gemini's native web grounding is what makes Block 3's security CVE lookup work without extra wiring), OR
>     - **Codex CLI** authenticated against the OpenAI key already on the Block 4 prereq list (alternative if you arrive with Codex).
>
> No new API keys required beyond what Block 4 already asks for.

**Optional one-line framing for the email:**

> Block 3 (Sam's afternoon block) uses Pi from pi.dev as the agent runtime, and a secondary CLI as a verifier. Install Pi + Gemini CLI before workshop day — both are free, no signup beyond a Google account for Gemini.

**Failure modes attendees might hit (worth flagging in the email):**

- `pi: command not found` after install → `~/.bun/bin` needs to be on PATH. Easiest fix: `export PATH="$HOME/.bun/bin:$PATH"` in their shell rc.
- Gemini CLI not finding credentials → run `gemini auth login` after install.

Block 3 lab is otherwise self-contained — all skills and extensions are pre-staged in the workshop repo. Attendees only need Pi running and a second CLI authenticated.

Anything else you need from me — fixture screenshots for the slide deck, narration script for review, or the v2.1 agenda doc update — let me know.

— Sam

---

## Reference — what's already shipped to the workshop repo for Block 3

Martin doesn't need to do anything with this — including for transparency in case he wants to review pre-Tuesday.

- `fixtures/agentic-target-sample/` — Nuxt-shaped fixture with 4 pinned vulnerable transitive deps (axios 0.21.0, lodash 4.17.20, minimist 1.2.5, serialize-javascript 3.0.0). Each has a stable public CVE.
- `.pi/skills/project-inspector/` — pre-staged from Block 2's v5 prompt (attendees still port their own during the lab beat).
- `.pi/skills/project-verifier/` — the load-bearing security lens; calls Gemini with web grounding for CVE lookup. **Dry-run tested 3/3.**
- `.pi/skills/architecture-verifier/` + `performance-verifier/` — showcase stubs for the 3-verifier multi-lens demo.
- `.pi/extensions/inspect-verify.ts` — TypeScript Pi extension; auto-fires verifier after inspector (interactive mode) + registers `/audit <path>` slash command (works in both modes).
- `AGENTS.md` + `SYSTEM.md` — project-scoped Pi hygiene primitives at repo root.
- `block3/README.md` — attendee walkthrough.
- `block3/instructor-notes.md` — instructor-only (planted-failure details, dry-run results table, failure-mode framing script, recovery scripts).
- `block3/narration-script.md` — full beat-by-beat narration with recovery scripts for likely-wobble scenarios.

The `Block 3 — (Instructor's separate materials)` placeholder in `README.md` is replaced.
