# Runbook: validator replacement

**Use when** the NodeID must change (key compromise, HSM migration, planned rotation).

1. Provision the new host. Collect NodeID + BLS PoP.
2. `./scripts/add-validator` (or the real SDK path against Fuji/mainnet).
3. Wait until the new validator is healthy and signing.
4. `./scripts/remove-validator` for the old identity.
5. Confirm churn limits were respected.
6. Decommission the old host only after completeValidatorRemoval.
