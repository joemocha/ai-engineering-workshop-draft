# AI Engineering Workshop

> **From Prompt Architecture to Production Infrastructure**

Companion repository for the full-day workshop *AI Engineering: From Prompt Architecture to Production Infrastructure* — first delivered at VueConf US 2026 (Atlanta, GA · 2026-05-19).

## What this repo is

Workshop materials for four blocks of hands-on AI engineering:

| Block | Topic | What you do here |
|---|---|---|
| **1** | Foundations | Write a v5 prompt for the Project Inspector running example |
| **2** | Build & Eval a Skill | Promote the prompt to a working skill via the `skill-creator` plugin; run the eval loop; learn to *evaluate the eval* |
| **3** | Vibe Coding → Agentic Engineering | Port your Block 2 skill into Pi; compose it with a verifier skill and a hook extension; watch the system catch what one skill alone misses |
| **4** | AI Gateway (Production) | Configure Bifrost; tour the production-gateway surface; integrate with a Vue/Nuxt app |

## Quick start

```bash
git clone https://github.com/<your-org>/ai-engineering-workshop.git
cd ai-engineering-workshop
cp .env.example .env
# Fill in your ANTHROPIC_API_KEY and OPENAI_API_KEY in .env
```

You'll fill in `WORKSHOP_VK` during Block 4.4 after creating a Virtual Key in Bifrost.

## Pre-workshop setup

See the [Prerequisites](#) (handed out separately). Minimum:

- Node.js LTS (20 or 22)
- Two LLM provider API keys with $5+ credit each (Anthropic + OpenAI recommended)
- An AI coding CLI installed (Claude Code, Codex CLI, or Gemini CLI)
- The `skill-creator` plugin installed via the Anthropic plugin marketplace
- **Pi installed** (`pi.dev`) — `bun install -g @earendil-works/pi-coding-agent`, then verify `pi --version` returns cleanly. (Block 3 runtime.)
- **A second CLI for verification** — Gemini CLI authenticated against your Google account (primary) or Codex CLI against your OpenAI key (alternative). Used by Block 3's verifier skill.

## Repository layout

```
ai-engineering-workshop/
├── AGENTS.md                   # Block 3: project instructions loaded by Pi at session start
├── SYSTEM.md                   # Block 3: per-project system-prompt append
├── skills/project-inspector/   # Block 2: your skill goes here (stub provided)
├── .pi/                        # Block 3: Pi-specific resources
│   ├── skills/                 #   ported inspector + verifier skills (security / arch / perf)
│   └── extensions/             #   inspect-verify.ts — auto-fires verifier after inspector
├── prompts/                    # Block 1: prompt-evolution reference (v0 baseline, v5 canonical fallback)
├── evals/                      # Block 2: eval suite
│   ├── evals.json              # 5 test cases with planted pathology (see Block 2 spec)
│   └── trigger-eval.json       # 20 queries for the description optimizer
├── fixtures/                   # Block 2 + 3: test inputs
│   └── agentic-target-sample/  # Block 3: Nuxt-shaped fixture with planted vulnerable deps
├── block3/                     # Block 3: instructor notes, narration script, attendee walkthrough
├── nuxt-app/                   # Block 4.9: Vue/Nuxt integration target
├── bifrost/                    # Block 4: Bifrost config (with semantic_cache plugin)
└── scripts/                    # Helper one-liners (cache demo, test prompts)
```

## Workshop day quick-navigation

**Block 1 — Foundations (morning)**
Open `prompts/project-inspector-v0.txt` and walk it through the 5-layer enhancement model. Save your v5 anywhere you like — you'll paste it into `skills/project-inspector/SKILL.md` in Block 2.

**Block 2 — Build & Eval a Skill (morning, after break)**
Open `skills/project-inspector/SKILL.md`. Paste your v5 from Block 1. Then run the `skill-creator` plugin against the `evals/` and `fixtures/` directories. The plugin will spawn parallel with-skill and baseline runs, grade them, and open a viewer. **Watch the Benchmark tab.** Something's planted in case 0 — the analyzer pass will tell you what.

**Block 3 — Vibe Coding → Agentic Engineering (afternoon, post-lunch)**
Copy your Block 2 skill into `.pi/skills/project-inspector/`. Launch `pi` from the repo root and inspect `fixtures/agentic-target-sample/`. The inspector will produce a clean Nuxt-3 briefing — and confidently miss something. We'll find the lie together, install the verifier skill, wire the `.pi/extensions/inspect-verify.ts` hook so the verifier fires automatically, and finish with the `AGENTS.md` / `SYSTEM.md` hygiene primitives. Attendee-facing walkthrough lives at [`block3/README.md`](block3/README.md).

**Block 4 — AI Gateway (afternoon)**
Boot Bifrost: `npm run bifrost`. Configure providers, models, a Virtual Key, a budget, a routing rule, and the semantic cache. Then `cd nuxt-app && npm install && npm run dev` and wire the Vue app to your gateway.

## Troubleshooting

- **`api.anthropic.com` unreachable** — corporate VPN; test connectivity before workshop day
- **Port 8080 in use** — kill the conflicting process or remap Bifrost (`--port 8081`) and update `BIFROST_URL` in `.env`
- **Port 3000 in use** — same fix; Nuxt accepts `--port`

## License

MIT — see [LICENSE](LICENSE). Take what's useful.
