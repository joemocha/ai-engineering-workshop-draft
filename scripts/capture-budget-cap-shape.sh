#!/usr/bin/env bash
# capture-budget-cap-shape.sh — dry-run helper for Block 4.5/4.9.
# Hammers the gateway with identical requests until the VK's budget cap fires (HTTP 402).
# Saves each response to /tmp/bifrost-call-N.json so you can inspect the 402 shape.
#
# Use this during the dry-run to capture the exact 402 JSON response Bifrost emits.
# The shape goes into the slide deck for Block 4.5.
#
# Requires:
#   - Bifrost running on $BIFROST_URL (default: http://localhost:8080)
#   - $WORKSHOP_VK set to a Virtual Key (created in Block 4.4)
#   - A budget attached to the VK with a low cap (Block 4.5, e.g. $0.50/1h)

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

MAX_CALLS=50
PAYLOAD='{"model":"anthropic/claude-sonnet-4-6","messages":[{"role":"user","content":"Say something verbose about distributed systems. Aim for 400 tokens."}],"max_tokens":500}'

echo "Hammering $BIFROST_URL until we hit a 402 (budget cap). Max calls: $MAX_CALLS"
echo ""

for i in $(seq 1 $MAX_CALLS); do
  HTTP_CODE=$(curl -s -X POST "$BIFROST_URL/v1/chat/completions" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $WORKSHOP_VK" \
    -d "$PAYLOAD" \
    -o "/tmp/bifrost-call-$i.json" \
    -w "%{http_code}")

  echo "Call $i: HTTP $HTTP_CODE"

  if [ "$HTTP_CODE" = "402" ]; then
    echo ""
    echo "=== 402 captured at call $i ==="
    echo "Response body saved to /tmp/bifrost-call-$i.json"
    echo ""
    echo "Body:"
    cat "/tmp/bifrost-call-$i.json" | jq '.' 2>/dev/null || cat "/tmp/bifrost-call-$i.json"
    echo ""
    echo "Copy the JSON above into the workshop folder as 'Block 4 - 402 response sample.md' for the slide deck."
    exit 0
  fi
done

echo ""
echo "Reached max calls ($MAX_CALLS) without hitting 402."
echo "Either:"
echo "  - Your budget cap is too high (lower it to \$0.05/1h to fire faster)"
echo "  - Your model is cheaper than expected (use a more expensive model)"
echo "  - The budget reset interval already fired during the loop"
exit 1
