# Block 3 — Instructor Notes

> ⚠️ **Instructor-facing.** Do NOT share with attendees pre-workshop. The dramatic-failure beat in Block 3 depends on attendees not knowing what's planted in `fixtures/agentic-target-sample/`.

## Technical dry-run results (2026-05-17)

Ran on workshop machine via `pi -p --tools read,bash,grep,find,ls`. Default provider Gemini.

| Test | N | Pass | Notes |
|------|---|------|-------|
| Inspector against `agentic-target-sample` — produces clean briefing with **no version/security context** | 3 | 3/3 | All runs listed all 4 vulnerable deps in `key_dependencies` as bare package names. None flagged any CVE, none cited a version. **Failure mode reproduces 100%.** |
| Verifier against `agentic-target-sample` — flags all 4 planted CVEs | 3 | 3/3 | `verified: false` every run. Advisory IDs stable for axios / minimist / serialize-javascript across runs. lodash flagged via either CVE-2021-23337, CVE-2020-28500, or a Command-Injection-via-template variant — all real lodash CVEs affecting `4.17.20`. Variation is acceptable; *the lesson is "verifier catches what inspector misses," not "verifier always cites the same advisory ID."* |
| Coordinated `/audit` chain — inspector then verifier, single turn | 2 | 2/2 | Both outputs produced in order, separated by `---`. Inspector portion lists vulnerable deps blindly; verifier portion catches all 4. |

**Aggregate: 8/8 invocations pass the technical-content acceptance criteria** (well above the ≥9/10 plan target on this sample size).

## What's still untested by this session

- **Interactive-mode `agent_end` auto-fire.** Requires an actual interactive terminal — the `pi -p` (print) flag exits after first turn and never honors queued `sendUserMessage` follow-ups. **Sam to confirm pre-Tuesday in an interactive Pi session.**
- **90-minute timing fit.** Requires a real-time rehearsal with narration. Run at least once with stopwatch before Tuesday.
- **Mode-transition feel between Mirrored ↔ YOUR TURN beats.** Audience reaction is the only real test.

## Acceptance gate before workshop day

- [ ] Sam runs `pi` interactively in the workshop repo. Asks "Inspect fixtures/agentic-target-sample/" → observes that the verifier auto-fires after the inspector turn ends (the extension's `agent_end` listener triggering `sendUserMessage`). Test passes if the agent runs the verifier without Sam typing a second prompt.
- [ ] Sam runs `/audit fixtures/agentic-target-sample/` interactively. Confirms the slash command produces both outputs in one coordinated turn.
- [ ] Sam runs the full 90-min beat-by-beat once with stopwatch, against the narration script.
- [ ] Sam loads the `agentic-target-sample` fixture into a fresh `.pi/skills` setup (simulating an attendee's port-and-run beat) and confirms inspector still misses + verifier still catches.

## Failure-mode framing for the dramatic beat (1:25–1:30)

When the inspector finishes and produces the clean Nuxt briefing, Sam's narration:

> *"Look at this output. It identifies the framework, the entry points, the data flow, and the key dependencies. Including — right there — axios, lodash, minimist, serialize-javascript. The inspector did its job. So what's the problem?*
>
> *The problem isn't what's there. The problem is what isn't. The inspector lists `axios` as a dependency but doesn't tell you it's pinned at `0.21.0`, and 0.21.0 has a public SSRF advisory. It lists `lodash` but doesn't tell you the pinned version is the one with the command-injection CVE. Same for minimist. Same for serialize-javascript.*
>
> *This isn't a buggy inspector. The inspector's spec doesn't ask it to look at version-bound security. Its spec asks for an architectural briefing — and an architectural briefing is what it gave. The failure is at the **system** level. You wrote one skill, the skill is doing its job, and you have a confidently incomplete answer.*
>
> *Agentic engineering is what you build when you stop trying to make one skill do everything and start composing skills into systems that catch themselves."*

This is the spine moment. Hold the beat. Let the room sit with the contrast between "the inspector is correct" and "the answer is wrong."

## Expected verifier output to project on screen

After the coordinated `/audit` (or the auto-fire chain), the verifier portion should produce JSON with:

- `verified: false`
- Four findings, one each for axios / lodash / minimist / serialize-javascript
- All flagged severity `high` (occasionally one flagged `critical`)
- Each with a CVE / GHSA advisory ID, summary, and remediation version
- `missed_by_structural_briefing` listing all 4

**The screenshot Sam needs for the slide deck:** Inspector briefing side-by-side with Verifier audit, with the `missed_by_structural_briefing` array highlighted. This visual is the punchline.

## If the dramatic failure doesn't reproduce on Tuesday

If for any reason Inspector starts flagging the CVEs on its own (unlikely but possible if Gemini's training data shifts or the prompt drifts), the fallback is to **strengthen Inspector's `## Constraints` section to explicitly say "do not perform security analysis"** — making the lensing scope explicit. This removes any ambiguity in the inspector's behavior.

If for any reason Verifier misses some CVEs, the fallback is to **add the deps to a `dependencies` block explicitly** (currently they are there) and/or to add a sentence in the verifier prompt instructing it to run web search for each pinned exact-version dependency. The verifier prompt is already structured this way; reinforcement may help on a flaky network day.
