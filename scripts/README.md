# Workshop Helper Scripts

Small shell scripts used during the workshop. All scripts read `.env` from the repo root if present.

## Available scripts

| Script | When you'd run it | What it does |
|---|---|---|
| `cache-demo.sh` | **Block 4.6** | Sends an identical prompt to Bifrost twice. With `semantic_cache` enabled, the second call hits cache (sub-100ms). |
| `send-test-prompt.sh` | Anytime — sanity check | One-shot prompt to verify Bifrost is alive, your VK works, the model responds. Accepts a custom prompt as `$1`. |

## Running

```bash
# From the repo root:
npm run demo:cache        # runs cache-demo.sh
npm run test:prompt       # runs send-test-prompt.sh with default prompt

# Or directly:
bash scripts/cache-demo.sh
bash scripts/send-test-prompt.sh "What is the capital of France?"
```

## Requirements

- `$WORKSHOP_VK` set in `.env` (created in Block 4.4)
- Bifrost running on `$BIFROST_URL` (default `http://localhost:8080`)
- `jq` installed (`brew install jq` on macOS)

## Troubleshooting

- **401 Unauthorized** — `WORKSHOP_VK` is wrong or missing. Check `.env`.
- **Connection refused** — Bifrost isn't running. Start it: `npm run bifrost`.
- **No cache hit on call 2** — make sure `semantic_cache` plugin is `enabled: true` in `bifrost/config.json` AND Bifrost was restarted after the change.
