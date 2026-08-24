# Disaster recovery

Intended RPO for validator identity: last successful staking-key backup. Intended RTO for a single validator: measured during a real drill, not promised here.

Neither RPO nor RTO has been measured.

## Drill A: destroy a validator (not executed)

1. Record accepted height on all validators.
2. Fence the failing host so the NodeID cannot return twice.
3. Stop V2. Do not call remove-validator.
4. Record whether accepted height still advances on the remaining nodes. Do not assume a 2/3 quorum.
5. Restore V2 from the identity backup onto a replacement directory or host.
6. Confirm original NodeID and BLS public key.
7. Confirm V2 accepted height catching up.

Three equal-weight validators may not tolerate one loss cleanly. Prefer five equal-weight validators for an N-1 demonstration.

## Drill B: backup / restore (not executed)

1. Inventory staking TLS, BLS or remote-signer identity, config, and state.
2. Write an encrypted per-validator blob with hashes and metadata.
3. Fence the old host.
4. Restore onto a replacement.
5. Assert NodeID and BLS public key unchanged.

`./scripts/backup` and `./scripts/restore` only stamp the Stage 1 JSON model. They are not this drill.
