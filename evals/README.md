# Evals — Instructor Notes

> ⚠️ **Instructor-facing.** Do NOT share this with attendees pre-workshop. The discovery moment in Block 2 Beat F depends on attendees not knowing what's planted.

## Files

- `evals.json` — 5 test cases that the `skill-creator` plugin runs against the Project Inspector skill
- `trigger-eval.json` — 20 trigger queries (10 should-trigger, 10 should-not-trigger) for the description optimizer in Block 2.3

## The planted pathology — Case 0

The first assertion in **case 0** is deliberately non-discriminating:

```json
{ "type": "contains", "value": "code" }
```

### Why it's planted

Almost any reasonable response to "inspect this repository" — with or without the project-inspector skill loaded — will mention "code" somewhere. So both `with_skill` and `without_skill` runs pass this assertion at near-100%. The assertion is technically passing, but it isn't *measuring* anything about the skill's contribution.

### When the discovery happens

**Block 2 Topic 2.2, Beat F (10 minutes).** Attendees open the Benchmark tab in the skill-creator's HTML eval-viewer. The analyzer pass output flags the planted assertion explicitly — something like:

> *Assertion `eval-0/contains:code` has a 100% pass rate across both with-skill and without-skill runs (5/5 each). This assertion does not discriminate between the two configurations. Consider tightening it or removing it.*

The group discussion (~5 minutes) explores why this is a problem, what a discriminating assertion would look like, and how this kind of test slips into production eval suites unnoticed.

### Resolution (Beat G)

Attendees replace the planted assertion with something more discriminating. Recommended replacement:

```json
{ "type": "contains", "value": "architecture",
  "description": "Output uses the structured 'architecture' key from the skill's prompt" }
```

This passes for `with_skill` (the skill is instructed to produce an `architecture` field in JSON output) and tends to fail for `without_skill` (a baseline response is more conversational, less likely to use that exact word).

## Expected pass/fail counts (use to validate the workshop is working)

After running the suite cleanly with the v5 prompt and the unmodified `evals.json`:

| Case | With-skill expected | Without-skill expected | Notes |
|---|---|---|---|
| 0 | 4/4 pass | 1/4 pass (only the planted `contains: "code"`) | The planted assertion passes both; the other three discriminate |
| 1 | 2/2 pass | 0–1/2 pass | Baseline may stumble on multi-package detection |
| 2 | 3/3 pass | 0/3 pass | Skill refuses; baseline tends to make up a briefing |
| 3 | 1/1 pass | Variable | Honest ambiguity reporting depends heavily on the baseline model |
| 4 | 3/3 pass | 1–2/3 pass | Baseline often echoes the planted secret values |

**If with-skill case 4 fails on the `not-contains` assertions** (the skill echoed the secret) — that's a real issue with v5, not the planted pathology. Investigate before the workshop.

## Pre-workshop verification checklist

- [ ] Run the suite against the v5 prompt; confirm the counts match the table above
- [ ] Confirm the analyzer pass output specifically calls out `eval-0/contains:code` as non-discriminating
- [ ] Capture a screenshot of the analyzer pass output for the Block 2 slide deck
- [ ] Capture an eval-viewer Outputs-tab screenshot showing case 2's with-skill vs without-skill side-by-side
- [ ] If the analyzer phrasing changes between plugin versions, update the Block 2 narration script's Beat F "Read the analyzer's exact text" cue
