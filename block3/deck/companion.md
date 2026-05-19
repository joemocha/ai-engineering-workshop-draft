# Block 3 — Terminal Companion

> One section per slide, 1:1 with `deck/index.html`. Copy-paste from here while the deck projects.
> Bash blocks = shell. Text blocks = paste into the running `pi` session.

---

## Slide 1 — Cover

> _Stand still. Wait for the room to settle in from lunch. Take a breath, then start with "Skills can lie."_

_(no terminal cue)_

---

## Slide 2 — Altitudes

> _Frame the four altitudes (Prompt → Skill → Workflow → Infra). You are here = Workflow. Same diagram Martin used._

_(no terminal cue)_

---

## Slide 3 — Pi at a glance

> _Quick hand-raise: who has Pi installed? Don't dwell. Verify your own install on the projector._

```bash
pi --version
```

```bash
cd ai-engineering-workshop && pi
```

---

## Slide 4 — Lab 1 | Port

> _Project the prompt. Set a 15-min visible timer. Circulate during the lab._

```bash
cp skills/project-inspector/SKILL.md .pi/skills/project-inspector/SKILL.md
```

```bash
cd ai-engineering-workshop && pi
```

```text
Inspect the repository at fixtures/agentic-target-sample/ and produce a structural briefing.
```

---

## Slide 5 — Stuck-points

> _Hold while circulating. These are the three checks for the ~95% of stuck attendees._

```bash
pwd
```

```bash
ls .pi/skills/project-inspector/
```

```bash
env | grep OPENAI_API_KEY
```

---

## Slide 6 — The Output

> _Read the JSON briefing aloud, briskly. End with: "So, what's the real problem here?" Hold the beat 5–10s._

_(no terminal cue — your own inspector output should already be on screen from the lab)_

---

## Slide 7 — The Lie

> _Walk the four CVEs line by line. axios SSRF, lodash command injection, minimist proto pollution, serialize-javascript XSS._

_(no terminal cue)_

---

## Slide 8 — Skills can lie

> _Hold this slide for ten seconds in silence. Spine moment. Let the contrast sit._

_(no terminal cue)_

---

## Slide 9 — Agentic engineering

> _"Systems that catch themselves. Let's build that." Move._

_(no terminal cue)_

---

## Slide 10 — Two lenses

> _Inspector reads as architect. Verifier reads as security engineer. Same data, different question._

_(no terminal cue)_

---

## Slide 11 — project-verifier

> _Project the SKILL.md from your terminal so the room sees the real file, not the deck excerpt._

```bash
cat .pi/skills/project-verifier/SKILL.md
```

Then, in `pi`:

```text
Use the project-verifier skill to audit fixtures/agentic-target-sample/. Output only the JSON audit.
```

---

## Slide 12 — The Reveal

> _Pull the verifier output up beside the inspector output. Side-by-side. Point to the `missed_by_structural_briefing` array._

```bash
tmux split-window -h
```

_(no other terminal cue — the two outputs are already on screen)_

---

## Slide 13 — Pi events

> _Walk the six lifecycle events. Flag that we'll use `agent_end`._

_(no terminal cue)_

---

## Slide 14 — inspect-verify.ts

> _Project the extension from your terminal. Highlight the two pieces: agent_end listener + registerCommand("audit")._

```bash
cat .pi/extensions/inspect-verify.ts
```

Restart Pi so the extension auto-loads:

```bash
cd ai-engineering-workshop && pi
```

Then re-run the inspector prompt and watch the verifier auto-fire:

```text
Inspect fixtures/agentic-target-sample/ and produce a structural briefing.
```

---

## Slide 15 — Two paths

> _Belt and suspenders. Ambient (agent_end) + explicit (/audit). Demo the explicit path now._

```text
/audit fixtures/agentic-target-sample/
```

---

## Slide 16 — Loading order

> _Same model as .gitignore / .editorconfig / tsconfig. Walk up. Inherit. Override._

_(no terminal cue)_

---

## Slide 17 — AGENTS.md

> _Project the file. Read the five rules aloud._

```bash
cat AGENTS.md
```

---

## Slide 18 — SYSTEM.md

> _Project the file. Framing, not facts. Three layers: AGENTS = conventions, SYSTEM = framing, skills = reasoning._

```bash
cat SYSTEM.md
```

---

## Slide 19 — Three verifiers

> _Narrated: same pattern you just built, more agents. Inspector + 3 lenses + deliberator._

_(no terminal cue)_

---

## Slide 20 — Deliberator

> _Run the multi-verifier audit live. Project the merged output. Point at "two of three lenses came back clean."_

```text
Audit the repository at fixtures/agentic-target-sample/ across three lenses. Run project-inspector first to produce the structural briefing. Then run project-verifier, architecture-verifier, and performance-verifier on the same target. Finally, merge the four outputs into a single deliberator JSON with fields: verified, verdict, lenses (security / architecture / performance with verified + findings count each), and required_before_merge.
```

---

## Slide 21 — Roundtable cameo

> _Open the prepared roundtable artifact. Same composition pattern, non-technical domain. Skill + extension + dispatch + deliberation._

_(no terminal cue — pre-rendered artifact)_

---

## Slide 22 — Tomorrow

> _Pick one. Build one. Ship both paths. Build the habit once, apply everywhere._

_(no terminal cue)_

---

## Slide 23 — Handoff

> _Block 4 next, after the break. Same composition thesis, one altitude up. Martin takes it from here._

_(no terminal cue)_

---

## Slide 24 — Q&A

> _Three minutes, more if you move fast. Pre-loaded answers below if relevant questions land._

Provider-swap one-liners (if asked "what if I want a different model?"):

```bash
pi --provider anthropic
```

```bash
pi --provider openai
```

```bash
pi --provider gemini
```
