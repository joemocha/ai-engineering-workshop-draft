#!/usr/bin/env bash
# cache-demo.sh — Block 4.6 helper
# Sends an identical prompt to Bifrost twice.
# First call: full latency + token usage.
# Second call: cache hit (sub-100ms, near-zero tokens) IF the semantic_cache
# plugin is enabled in bifrost/config.json.
#
# Requires:
#   - Bifrost running on $BIFROST_URL (default: http://localhost:8080)
#   - $WORKSHOP_VK set to a valid Virtual Key (created in Block 4.4)
#   - semantic_cache plugin enabled (Block 4.6 step)

set -euo pipefail

# Load .env if present
if [ -f "$(dirname "$0")/../.env" ]; then
  set -a
  # shellcheck disable=SC1091
  source "$(dirname "$0")/../.env"
  set +a
fi

BIFROST_URL="${BIFROST_URL:-http://localhost:8080}"
WORKSHOP_VK="${WORKSHOP_VK:-}"

if [ -z "$WORKSHOP_VK" ]; then
  echo "ERROR: WORKSHOP_VK not set. Create a Virtual Key in Bifrost (Block 4.4) and add it to .env"
  exit 1
fi

PROMPT="What are the benefits of strongly typed languages? Answer in one paragraph."
MODEL="anthropic/claude-sonnet-4-6"

PAYLOAD=$(cat <<EOF
{
  "model": "$MODEL",
  "messages": [{"role": "user", "content": "$PROMPT"}],
  "max_tokens": 200,
  "temperature": 0
}
EOF
)

echo ""
echo "=== Call 1 — expect full latency ==="
time curl -s -X POST "$BIFROST_URL/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $WORKSHOP_VK" \
  -d "$PAYLOAD" \
  | jq -r '.choices[0].message.content' \
  | head -c 200
echo ""
echo ""

echo "=== Call 2 — should hit cache (sub-100ms) ==="
time curl -s -X POST "$BIFROST_URL/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $WORKSHOP_VK" \
  -d "$PAYLOAD" \
  | jq -r '.choices[0].message.content' \
  | head -c 200
echo ""
echo ""

echo "Check Bifrost dashboard > Observability > LLM Logs to confirm call 2 was a cache hit."
