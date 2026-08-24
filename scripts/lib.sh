#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
API="${NORTHSTAR_API:-http://127.0.0.1:43127/api/control-plane}"

api() {
  curl -sS "$API"
}

act() {
  local action="$1"
  curl -sS -X POST "$API" \
    -H "content-type: application/json" \
    -d "{\"action\":\"$action\",\"validatorId\":\"${2:-v2}\"}"
}

need_jq() {
  if ! command -v jq >/dev/null 2>&1; then
    echo "jq is required for pretty output. Raw JSON follows."
    return 1
  fi
}
