#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
export PATH="$HOME/bin:$HOME/.avalanche-cli/bin:$PATH"

need_cli() {
  if ! command -v avalanche >/dev/null 2>&1; then
    echo "avalanche-cli is not on PATH."
    echo "Install: curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh | sh -s"
    exit 1
  fi
}

northstar="${NORTHSTAR_L1:-northstar}"
settlement="${SETTLEMENT_L1:-settlement}"
