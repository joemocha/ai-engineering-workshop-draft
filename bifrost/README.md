# Bifrost — Gateway Configuration

Pre-staged Bifrost configuration for the workshop.

## What's here

- `config.json` — Bifrost plugin config. The `semantic_cache` plugin is **disabled by default**; you enable it during Block 4.6 to demo cache hits.

## Starting Bifrost

From the repo root:

```bash
npm run bifrost
```

This runs:

```bash
npx -y @maximhq/bifrost --config ./bifrost/config.json
```

Bifrost should start on `http://localhost:8080`. The dashboard is at the same URL — open it in a browser to walk the sidebar.

## Block 4.6 — enabling the Semantic Cache

When prompted in the workshop:

1. Open `bifrost/config.json` in your editor
2. Change `"enabled": false` → `"enabled": true` on the `semantic_cache` plugin
3. Restart Bifrost: `Ctrl-C` then `npm run bifrost` again

Verify with:

```bash
npm run demo:cache
```

The script sends an identical prompt twice. The second call should complete in sub-100ms (cache hit) versus several seconds for the first call.

## Troubleshooting

- **Port 8080 in use** — find the process: `lsof -i :8080` · kill it · re-run. Or start Bifrost on a different port via CLI flag and update `BIFROST_URL` in `.env`.
- **Bifrost binary download fails** — corporate proxy / VPN. Try `npx -y @maximhq/bifrost` directly and check the error output.
- **Cache doesn't hit on second call** — the two calls must be byte-identical (same model, same prompt, same parameters). If `temperature` or `max_tokens` differ, the cache key differs.
