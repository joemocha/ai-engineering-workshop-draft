# Bifrost — Gateway Configuration

Pre-staged Bifrost configuration for the workshop.

## What's here

- `config.json` — Bifrost file-driven config. Holds the `$schema` reference, the `semantic_cache` plugin entry (disabled by default; see "Semantic Cache — take-home" below), and any future provider/governance bootstrap. See [the Block 4 slide flow's "Sample full `config.json`" appendix](../docs/) for what file-driven providers + governance look like.

## Starting Bifrost

From the repo root:

```bash
npm run bifrost
```

This runs:

```bash
npx -y @maximhq/bifrost --app-dir ./bifrost
```

Bifrost should start on `http://localhost:8080`. The dashboard is at the same URL — open it in a browser to walk the sidebar.

**Where Bifrost writes state:** `./bifrost/` (workshop-local — set by `--app-dir`). All persisted state — `config.json`, `config.db` (providers, VKs, budgets, routing rules, prompts), `logs.db` (LLM Logs) — lives here. **Not** in `~/.bifrost/` or `~/.config/bifrost/` (those are the defaults when `--app-dir` is not specified). Workshop-local state means easy reset and no conflicts with any pre-existing Bifrost install on your machine.

## Semantic Cache — take-home (not a live workshop HO)

The `semantic_cache` plugin entry is pre-staged in `config.json` with `"enabled": false`. In the workshop we describe the cache concept in Beat 4.8.F as a lecture aside rather than wiring it live — semantic caching needs **three** pieces to fire and only one of them is a config flag:

1. **Plugin enabled** — flip `"enabled": false` → `"enabled": true` on the `semantic_cache` entry below (already pre-staged here for you).
2. **Vector store configured** — Bifrost does not bundle one. Add a `vector_store` block to `config.json` pointing at Weaviate, Redis, or whichever vector store your stack runs.
3. **`x-bf-cache-key` header on every request** — the plugin keys cache entries by this header (per-session or per-tenant namespacing). Without it the plugin silently doesn't cache.

After all three pieces are in place, restart Bifrost (`Ctrl-C` then `npm run bifrost`) and verify with:

```bash
npm run demo:cache
```

The script is left in the repo as a starting point — you'll need to add `-H "x-bf-cache-key: <some-id>"` to its curls once you have a vector store wired.

**Why this isn't a live HO:** vector-store setup (whether Weaviate via Docker, Redis, or an external service) is workshop-scale work on its own and orthogonal to the gateway-pattern teaching. The workshop teaches the *concept* and leaves the storage choice as something your team owns.

## Troubleshooting

- **Port 8080 in use** — find the process: `lsof -i :8080` · kill it · re-run. Or start Bifrost on a different port via CLI flag and update `BIFROST_URL` in `.env`.
- **Bifrost binary download fails** — corporate proxy / VPN. Try `npx -y @maximhq/bifrost --app-dir ./bifrost` directly and check the error output.
- **`flag provided but not defined: -config`** — using an old script that passes `--config <file>`. The current CLI uses `--app-dir <directory>`. `npm run bifrost` already uses the correct shape.
