#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
API="${NORTHSTAR_API:-http://127.0.0.1:43127/api/control-plane}"

model_warning() {
  echo "NOTE: Stage 1 JSON model. This does not talk to AvalancheGo." >&2
}

api() {
  model_warning
  curl -fsS "$API"
}

act() {
  local action="$1"
  model_warning
  curl -fsS -X POST "$API" \
    -H "content-type: application/json" \
    -d "{\"action\":\"$action\",\"validatorId\":\"${2:-v2}\"}"
}

need_jq() {
  if ! command -v jq >/dev/null 2>&1; then
    echo "jq is required." >&2
    exit 1
  fi
}
