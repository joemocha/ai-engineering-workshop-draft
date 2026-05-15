#!/usr/bin/env bash
# send-test-prompt.sh — Quick sanity-check helper.
# Sends a one-shot prompt to Bifrost. Confirms the gateway is alive,
# your VK works, and a configured model responds.

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

PROMPT="${1:-Say hello in one word.}"
MODEL="${2:-claude-sonnet-4-6}"

echo "Prompt: $PROMPT"
echo "Model:  $MODEL"
echo "URL:    $BIFROST_URL"
echo ""

curl -s -X POST "$BIFROST_URL/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $WORKSHOP_VK" \
  -d "{
    \"model\": \"$MODEL\",
    \"messages\": [{\"role\": \"user\", \"content\": \"$PROMPT\"}],
    \"max_tokens\": 100
  }" \
  | jq '.'
