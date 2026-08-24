# Runbook: validator failure

**Use when** a validator is unreachable, disk-full, or the instance is gone.

**Do not** call `remove-validator`. The P-Chain identity is still valid.

**Stage 1 warning:** `./scripts/health` reads the JSON model. Do not use it as chain health.

1. Fence the old host (stop the process, isolate the instance, or revoke its network path) so the same NodeID cannot come back twice.
2. Record accepted height and acceptance latency on the remaining nodes. Process count is not health.
3. Open the incident. Sev2 if height is still advancing. Sev1 if it is not, or if a key is suspected.
4. If the host is reachable, collect `journalctl -u avalanchego` and disk metrics.
5. Launch a replacement only after the old identity is fenced.
6. Restore staking TLS, signer, and BLS from the backup that belongs to that NodeID.
7. Confirm NodeID equals the registered identity.
8. Watch last accepted height catch up. If it does not, you do not have a restore.
9. Close with a timeline.

This runbook has not been executed against AvalancheGo in this repository.
