# Block 3 Narration Script

> **Use:** Read this once Saturday, once Sunday, then improvise the connective tissue on Tuesday. Stage directions in [brackets]. Italics mark emphasis I should hold.

**Block 3 slot:** 1:00 to 2:30 PM (90 min, post-lunch). Sam-led. Arc C: spiral with dramatic failure.

---

## 1:00 to 1:05 · Frame [Mirrored, 5 min]

[Stand at front. Wait for the room to settle in from lunch. Take a breath.]

> Skills can lie. You build, you ship, you trust the brief, and the lie slips by. That's the whole block in one line. Now let me earn it.
>
> In Block 1 you wrote a prompt. In Block 2 you turned that prompt into a skill, therefore you also learned something uncomfortable. You learned that evals can lie. Your assertions can technically pass and still measure nothing.
>
> Here's the thing. We're going up one altitude. Block 2 was about *a* skill. Block 4, after the next break, is going to be about deploying *fleets* of skills at production scale. Block 3 is the bridge. It's about the developer-workflow layer. How a working engineer composes skills, hooks, and verifiers into a system that doesn't fall over the first time it meets a real codebase.
>
> So the thesis. Evals can lie, but skills can lie too. A single skill can be technically correct on its own terms and still hand you a confidently wrong answer about your project. Agentic engineering is the discipline of building systems that catch themselves.
>
> I'm not going to show you that on a slide. I'm going to show it to you the way it actually happens. Here's a real failure, therefore here's what you build to catch it.

[Beat. Open Pi on the projector.]

> The runtime is Pi, from pi.dev. Minimal terminal coding harness, defaults to Gemini. If you finished the prereq you have it installed. If you don't, raise your hand and grab a neighbor for ninety seconds. Don't wait for the lab to find out.

[Quick hand-raise check. Don't dwell. Move.]

---

## 1:05 to 1:25 · Port Project Inspector into Pi [YOUR TURN, 20 min]

> Open your workshop repo. The Project Inspector skill you built in Block 2 lives at `skills/project-inspector/`. We're going to put it where Pi can find it, at `.pi/skills/project-inspector/`. That's the convention. Project-local skills under `.pi/skills/`, project-local extensions under `.pi/extensions/`. Pi auto-discovers both when you launch from the repo root.

[Project the file path on screen. Pause for attendees to copy.]

> Copy your SKILL.md from `skills/project-inspector/SKILL.md` into `.pi/skills/project-inspector/SKILL.md`. Don't symlink yet. Just copy. We'll talk about hygiene later.
>
> Then run `pi` from the repo root and ask it to inspect this directory: `fixtures/agentic-target-sample/`. Use this prompt. *"Inspect the repository at `fixtures/agentic-target-sample/` and produce a structural briefing."*

[Project the prompt on screen. Set a 15-minute timer visible to the room.]

> Take fifteen minutes. Get it running. If you finish early, look at the output, but don't analyze it yet. We're going to do that together.

[Circulate. Help people who are stuck. Three common failures: skill not under `.pi/skills/`, wrong cwd, missing API key. The first two are easy to spot.]

[At 12 minutes: "Five-minute warning. If you're not running yet, flag a neighbor."]

---

## 1:25 to 1:30 · The Failure [Mirrored, 5 min, the spine moment]

[Pull everyone back. Stand still. Walk through your own output on the projector.]

> All right. What did you get? Look at your output. Mine looks like this.

[Read the inspector JSON aloud, briskly.]

> Framework: Nuxt 3. Entry points: `pages/index.vue`, `pages/about.vue`, `nuxt.config.ts`. Data flow: pages render via Nuxt's server, consume composables, render components. Key dependencies: `nuxt`, `vue`, `axios`, `lodash`, `minimist`, `serialize-javascript`. Test patterns: no tests detected.
>
> That's a clean briefing. The skill did its job. You could hand this to a teammate cold and they could navigate this repo.
>
> So. What's the real problem here?

[Hold the beat. Let the room think. Five to ten seconds of silence is fine.]

> The problem isn't what's there. The problem is what *isn't*.
>
> The inspector lists `axios` as a key dependency, but it doesn't tell you the pinned version is `0.21.0`, and `0.21.0` has a public CVE. Server-side request forgery. It lists `lodash`, but it doesn't tell you the pinned version is the one with the command-injection advisory. Same for `minimist`. Same for `serialize-javascript`. Four of those packages are pinned at vulnerable versions, therefore the inspector lists every one of them, blindly.
>
> This isn't a buggy skill. The inspector's spec doesn't ask it to look at version-bound security. Its spec asks for an architectural briefing, therefore that's what it gave you. The failure isn't in the skill. The failure is at the *system* level. You wrote one skill, the skill is doing its job, but you have a confidently incomplete answer.

[Beat.]

> Here's the insight. Agentic engineering is what you build when you stop trying to make one skill do everything and start composing skills into systems that catch themselves. Let's build that.

---

## 1:30 to 1:50 · Verifier Agent Enters [Mixed, 20 min]

### 1:30 to 1:35 · Setup [Mirrored, 5 min]

> What we need is a second lens. The inspector reads the project as an architect. The verifier reads it as a security engineer. Same data, different question.
>
> Take a look at `.pi/skills/project-verifier/SKILL.md`.

[Project the SKILL.md on screen.]

> Read the description line. That's what makes Pi reach for this skill when the trigger words show up. Read the process. It tells the agent: locate the manifest, extract pinned versions, look up known advisories, cross-reference with `npm audit` if you can, and emit JSON.
>
> One thing to notice. This skill doesn't shell out to a separate process as its primary path. It uses Gemini's native web grounding to look up CVEs by pinned version. That's the multi-CLI move at the workflow altitude. Pi running on one model, the skill leveraging that model's grounding to do work the inspector can't. You'll see the same composition move at the *infrastructure* altitude in Block 4, when Martin shows you the gateway sitting in front of multiple model providers. Same pattern, two altitudes.

### 1:35 to 1:48 · YOUR TURN [13 min]

> Your turn. Run the verifier on the same target. Prompt: *"Use the project-verifier skill to audit `fixtures/agentic-target-sample/`. Output only the JSON audit."*
>
> Twelve minutes. Go.

[Circulate. Watch for Gemini rate-limiting. If the room hits limits simultaneously, stagger the YOUR TURN by going row by row.]

[At 8 minutes: "Four-minute warning."]

### 1:48 to 1:50 · The Reveal [Mirrored, 2 min]

> Pull yours up next to the inspector output. Side by side.

[Switch projector to your prepared screenshot, or share your own terminal split.]

> Look at the verifier's JSON. `verified: false`. Four findings. Axios, SSRF, high severity. Lodash, command injection, high. Minimist, prototype pollution, high. Serialize-javascript, cross-site scripting, high.
>
> Look at this field, `missed_by_structural_briefing`. Every one of the four. The verifier knows what the inspector missed, because it applied a different lens to the same input.
>
> Same data. Different question. Different answer. That's the composition move.

---

## 1:50 to 2:05 · Hooks, the Pi Extension [Mixed, 15 min]

### 1:50 to 1:55 · Walk through the extension [Mirrored, 5 min]

> Right now you're running the verifier by hand. You ask the inspector, you eyeball the output, therefore you remember to ask for the verifier. That works in this room. But it doesn't survive Monday morning.
>
> So we're going to make it ambient. Pi has an extension system. TypeScript modules that subscribe to agent lifecycle events.

[Open `.pi/extensions/inspect-verify.ts` on screen.]

> Forty lines of code total. Two pieces.
>
> First piece.

[Highlight the `pi.on("agent_end", ...)` block.]

> When the agent finishes a turn, this listener checks the last assistant message. If it looks like an inspector briefing, JSON with `architecture` and `entry_points`, and it doesn't already look like a verifier output, the extension calls `pi.sendUserMessage` to inject a follow-up. *"Now run the verifier on the same target."* Pi treats that as if the user typed it, therefore it runs another turn, therefore the verifier fires. Automatic.
>
> Second piece.

[Highlight the `pi.registerCommand("audit", ...)` block.]

> A slash command. `/audit <path>` injects a single coordinated prompt that runs inspector then verifier in one turn. Works the same in interactive and non-interactive mode. Belt and suspenders. The auto-fire is the ambient lesson. The slash command is the reliable path.
>
> Why both? Because I used to think one path was enough, but I learned the hard way that the ambient one only fires in interactive mode. The slash command always works. Build both, ship both.

### 1:55 to 2:05 · YOUR TURN [10 min]

> Drop the file into your `.pi/extensions/` directory. It's already in the workshop repo at `.pi/extensions/inspect-verify.ts`. Restart Pi from the repo root, therefore the extension auto-loads. Then run the inspector prompt again, same as before, *"Inspect `fixtures/agentic-target-sample/` and produce a structural briefing,"* and watch what happens after the inspector finishes.
>
> Ten minutes. Go.

[Circulate. Watch for two failure modes: extensions not auto-loading because of wrong cwd, or the heuristic not matching, which is rare.]

[At 8 minutes: "If you got the auto-fire, also try `/audit fixtures/agentic-target-sample/`. Same chain, explicit command path."]

---

## 2:05 to 2:15 · Hygiene, AGENTS.md + SYSTEM.md [Mixed, 10 min]

### 2:05 to 2:12 · The lesson [Mirrored, 7 min]

> Last lab beat before the showcase. We just made a system that catches itself. But none of this survives if you don't tell Pi what it's allowed to know.
>
> Pi reads two files automatically at session start. `AGENTS.md` and `SYSTEM.md`. Both project-scoped. Loading order matters. First `~/.pi/agent/`, then every parent directory of your cwd, then the cwd itself. Closer scope wins.

[Open `AGENTS.md` on screen.]

> This file is project instructions. It tells Pi what this repo is, where things live, what conventions the agent should follow inside it. *"Skills are the unit of agent capability. Extensions wire, skills reason. One JSON shape per verifier. Never echo secrets. Honest scoping."* Five rules, no more. Read yours, and the room and the code should line up.

[Switch to `SYSTEM.md`.]

> This file appends to the default system prompt. Use it for framing that should shape every response in the repo. Pedagogical-honesty rules. Output-shape rules. Citation rules.
>
> Here's the principle. Less is more. Don't try to put your whole brain in here. Put the load-bearing project conventions in `AGENTS.md`. Put the load-bearing framing in `SYSTEM.md`. Everything else lives in the skills themselves, where it's scoped to the work that actually needs it.
>
> I used to throw everything into one file. Therefore my agent got confused, slow, expensive. Now I scope by purpose. Skills carry the reasoning. The hygiene files carry the conventions. Easier to debug, easier to evolve.

### 2:12 to 2:15 · YOUR TURN [3 min]

> Three minutes. Drop the workshop repo's `AGENTS.md` and `SYSTEM.md` into your own project at home tonight. Or sketch one for a project you actually work on. One sentence per rule. No more than five rules.
>
> When you're back next week and Pi feels too eager or too cautious or too forgetful, this file is where you fix it.

---

## 2:15 to 2:23 · Showcase, Pattern Extended [Demo, 8 min]

[Sam drives. Attendees watch.]

> Last fifteen minutes. Two demos and Q&A.
>
> First demo. Same pattern you just built. More agents.

[Open a terminal with three verifier skills installed: project-verifier, architecture-verifier, performance-verifier.]

> Inspector reads the project as an architect. Project-verifier reads it as a security engineer. Architecture-verifier reads it as a staff architect. Performance-verifier reads it as a build-and-bundle engineer. Each one is a different lens on the same source. A deliberator agent merges the outputs into one combined audit, therefore it tells you which findings need attention.

[Run the multi-verifier audit live on `fixtures/agentic-target-sample/`. Project the merged output.]

> Notice this. On this fixture, only one lens flagged anything. Security found four high-severity issues. Architecture came back clean. Performance came back clean. The deliberator says: ship with the security fixes. The other lenses are already green.
>
> Three things. One: nothing new under the hood. Same primitives you used in the lab. Skill, extension, hook. Just more skills. Two: a clean lens is a valid output. The architecture verifier wasn't padding to look thorough. It applied its lens, and the project genuinely passed. That's discipline. Three: the deliberator is itself a skill. Same pattern all the way down.

---

## 2:23 to 2:27 · Showcase Cameo, the Roundtable [Demo, 4 min]

> Last demo. Briefly. Same composition pattern. Different domain.

[Open a prepared roundtable artifact. Strategic question, multiple persona agents running in parallel. Project on screen.]

> This is a council of persona agents running on a non-technical question. Strategic, product, whatever. Each persona is itself a skill. Each one applies a different lens. A synthesizer agent reads all the takes and pulls out the load-bearing disagreement, the blind-spot scan, the recommendation.
>
> The pattern is identical to what you just built. Skill plus extension plus dispatch plus deliberation. The only things that scale are the count of lenses and the depth of the deliberator.
>
> Once you build agentic engineering as a habit, this stops looking like dev tooling. It starts looking like a thinking partner.

---

## 2:27 to 2:30 · Q&A [3+ min, protected]

> Three minutes. More if I move fast.
>
> Questions. What's confusing, what's missing, what's not going to survive Monday for you.

[Common questions, short answers:]

- **"How do you keep the auto-fire from looping?"** Fingerprint the inspector output, dedupe at the extension level. The version in your repo does that.
- **"What if Pi defaults to a different model?"** `pi --provider anthropic` or `--provider openai`. The skills are model-agnostic. Only Gemini's web grounding made the security CVE lookup free. With Claude or OpenAI you'd shell out to `npm audit`, or you'd register a Gemini call from inside the skill.
- **"What about cost?"** Workshop fixtures are tiny. Real audits with real codebases cost real tokens. Block 4 is where you learn to put budgets and caches around that.
- **"Can I run multiple Pi sessions in parallel?"** Yes. Pi has RPC mode. That's the showcase shape. Multiple verifiers dispatched in parallel.

[At ~2:29, wrap.]

> Here's what you can do tomorrow. Pick one skill from your own work where the output is technically correct but operationally incomplete. Therefore build the verifier that catches what it misses. Same pattern. Same primitives. Different domain. One skill, one verifier, one hook. That's the habit. Build it once. Apply it everywhere.
>
> Block 4 is next, after the break. Same composition thesis, one altitude up. Same skills, same hook, same lesson. Just bigger. Martin takes it from here.

---

## Recovery scripts, if things wobble on Tuesday

### "Inspector flagged the CVEs by itself"

Unlikely, but possible if Gemini's training drifts. Recovery:

> "Interesting. The inspector picked up on the version risk this time. That's not normal behavior for a structural-briefing skill, therefore you'd be wise to consider it an accident, not a feature. The point of this block is that no single skill should be relied on to do work outside its spec. The verifier still exists for the same reason."

### "Verifier missed one of the CVEs"

Possible on a flaky network day. Recovery:

> "Three out of four. That's actually closer to the realistic case in production. No verifier is perfect. The point isn't that the verifier always catches everything. The point is that the verifier catches what the inspector by definition can't. Composing more verifiers, which we'll see in the showcase, is how you tighten the net."

### "The auto-fire didn't trigger on an attendee's machine"

Most common cause: extension not auto-loaded because of wrong cwd. Recovery:

> "The auto-fire only fires when Pi launches from the workshop repo root with the extension auto-discoverable. If you launched from elsewhere, use `-e .pi/extensions/inspect-verify.ts` on the command line. Or if you'd rather skip the auto-fire entirely, use the `/audit` slash command. Same outcome. Explicit instead of ambient."

### "Running short on time at 2:15"

Cut the S2 roundtable cameo (4 min). The S4 multi-verifier showcase is the load-bearing closer. The roundtable is the bonus.

### "Running short on time at 1:30"

If the port-skill beat ran long, skip the Hygiene YOUR TURN. Make hygiene a pure 7-min lecture. Attendees can drop the files in later.

### "Running long after the failure beat"

Compress the verifier YOUR TURN from 13 min to 9 min. Most attendees will get there in 9 if they have the inspector running. The 4-min slack feeds the showcase and Q&A.

---

## Pre-workshop self-rehearsal checklist

- [ ] Read this script aloud once. Saturday or Sunday. No edits. Notice where the cadence breaks.
- [ ] Run the full 90 minutes with a stopwatch, doing the Pi commands I'd demo on stage. Don't try to land the narration in less than 90. Running short under pressure is fine. Running long is fatal.
- [ ] Confirm in interactive mode that the `agent_end` auto-fire works. That's the only path not tested by `pi -p`. Test by running `pi` from the repo root, asking *"inspect fixtures/agentic-target-sample/"*, and watching for the verifier to auto-fire after the inspector turn finishes.
- [ ] Take the two side-by-side screenshots. Inspector clean briefing plus verifier audit with `missed_by_structural_briefing` highlighted. For the slide deck.
- [ ] Read the recovery scripts. Internalize the first two. Those are the ones most likely to fire.
