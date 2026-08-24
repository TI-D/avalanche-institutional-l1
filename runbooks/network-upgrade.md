# Runbook: network upgrade

1. Pin the new AvalancheGo version in `ansible/avalanchego/tasks/main.yml`.
2. Read the release notes for C-Chain / P-Chain / Warp incompatibilities.
3. Upgrade one validator. Wait for healthy. Continue.
4. Upgrade RPC last.
5. If peers fail to handshake, roll the last node back to the pinned previous version.

Never upgrade consensus and the RPC load balancer in the same change window.
