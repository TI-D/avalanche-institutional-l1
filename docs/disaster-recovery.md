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

## Drill B: backup / restore (local restic path executed)

Local substitute: `make backup-test`. OpenBao `-dev` Transit wraps the restic password. restic backups staking material extracted from a live `flags.json`. Restore hashes and NodeID matched `NodeID-BgLdV9zWyYUp6jp4RkxoDMvuMo6h8bj2w`.

This is not a host-replacement drill. It did not fence a running validator. `./scripts/backup` and `./scripts/restore` still only stamp the Stage 1 JSON model.
