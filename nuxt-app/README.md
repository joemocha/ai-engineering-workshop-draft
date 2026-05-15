# nuxt-app — Block 4.9 Integration Lab

A minimal Vue/Nuxt 3 application that talks to Bifrost. Used as the integration target for the workshop's Block 4.9 lab (20 minutes).

## The boundary

Vue knows about **one URL** — the gateway. Everything else (provider keys, model selection, routing rules, budgets, caching, guardrails) lives in Bifrost.

```
[Vue page]  →  [Nuxt server route]  →  [Bifrost gateway]  →  [Provider]
useFetch        defineEventHandler      localhost:8080         Anthropic / OpenAI / Bedrock
```

The Vue page calls a Nuxt server route. The server route POSTs to Bifrost with a bearer token (the Workshop Virtual Key from Block 4.4). Bifrost handles routing, budgets, caching, etc. The Vue side never sees a provider key.

## The 4 files that matter

| File | Purpose |
|---|---|
| `nuxt.config.ts` | `runtimeConfig` exposes `bifrostUrl` + `workshopVk` to server-only code |
| `pages/index.vue` | Chat UI — calls `/api/chat` via `useFetch`; renders reply or policy-blocked warning |
| `server/api/chat.post.ts` | Nuxt server route — receives the prompt, calls Bifrost, surfaces 4xx errors cleanly |
| `server/utils/bifrost.ts` | Tiny `$fetch` wrapper around `${bifrostUrl}/v1/chat/completions` with the bearer token |

## Running

From the **repo root**:

```bash
# Install + dev (also runs nuxt prepare on postinstall)
npm run dev:nuxt
```

Or from this directory:

```bash
npm install
npm run dev
```

Nuxt boots on `http://localhost:3000`.

## Setup checklist (Block 4.9 Beat 2)

Before sending your first message, confirm:

- [ ] Bifrost is running on `localhost:8080` (`npm run bifrost` from the repo root)
- [ ] You created a Virtual Key in Bifrost (Block 4.4) and copied its value
- [ ] `.env` (in the repo root OR this directory) has `WORKSHOP_VK=<your VK>` filled in
- [ ] At least one provider configured in Bifrost (Block 4.2 — Anthropic + OpenAI minimum)
- [ ] At least one model enabled in Bifrost's Model Catalog (Block 4.3)

## What you'll observe

1. Send a message via the UI
2. Server route POSTs to Bifrost with `Authorization: Bearer <VK>`
3. Bifrost routes per its rules (Block 4.6), applies budgets (Block 4.5), checks cache (Block 4.6)
4. Response renders in the UI
5. Open Bifrost dashboard → **Observability → LLM Logs** — your request appears, attributed to your VK

## Beat 3 — Watch the system work

Send many messages rapidly until your VK's budget cap hits. Bifrost returns **402 Payment Required**. The server route catches it and surfaces a **403 with a "policy blocked"** message to the UI. The policy-warning section renders.

This is the *guardrail-trip* pattern in code:

- Vue: doesn't have to know why the call was blocked (budget? guardrail? rate limit?). Just renders the policy warning.
- Server route: translates upstream 4xx into something the UI can render gracefully.
- Bifrost: the source of policy truth — enforces what your VK is allowed to do.

## Troubleshooting

- **`502 Bad Gateway` from `/api/chat`** — Bifrost isn't reachable. Run `npm run bifrost` from the repo root.
- **`500 — WORKSHOP_VK not configured`** — `.env` is missing `WORKSHOP_VK`. Set it.
- **`401 Unauthorized` from Bifrost** — VK string is wrong. Check the value in Bifrost's Virtual Keys page and update `.env`.
- **Cache hits not showing** — confirm the `semantic_cache` plugin is `enabled: true` in `bifrost/config.json` and Bifrost was restarted after the change.
- **Port 3000 in use** — `npm run dev -- --port 3001`. (Or kill whoever has port 3000.)
