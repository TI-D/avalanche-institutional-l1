# Disaster recovery

RPO for validator identity: last successful staking-key backup. RTO for a single validator: under one hour if Terraform capacity is ready.

## Drill A: destroy a validator

1. Healthy 3/3.
2. Terminate V2.
3. Confirm 2/3 still finalize.
4. Rebuild V2 from backup.
5. Confirm original NodeID.
6. Healthy 3/3.

## Drill B: backup / restore

1. `./scripts/backup`
2. Build a new host
3. `./scripts/restore`
4. Assert NodeID and BLS public key unchanged

Evidence lives in the ops console audit trail and, in production, Prometheus + the change ticket.
