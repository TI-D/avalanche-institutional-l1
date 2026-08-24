# Runbook: validator failure

**Use when** a validator is unreachable, disk-full, or the instance is gone.

**Do not** call `remove-validator`. The P-Chain identity is still valid.

1. `./scripts/health`. Confirm at least two validators healthy.
2. Open the incident. Sev2 if quorum remains. Sev1 if not.
3. If the host is reachable, collect `journalctl -u avalanchego` and disk metrics.
4. Launch replacement in the same AZ from Terraform.
5. Restore staking TLS, signer, and BLS from the backup bucket.
6. Confirm NodeID equals the registered identity.
7. Watch last accepted height and peer count for 15 minutes.
8. Close with a timeline.
