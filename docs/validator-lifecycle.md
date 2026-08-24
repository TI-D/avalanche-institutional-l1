# Validator lifecycle

Northstar is PoA. `ValidatorManager` is owned by `PoAManager`.

## Add

1. Provision host. Collect NodeID, BLS public key, proof of possession.
2. `PoAManager.initiateValidatorRegistration` (L1 tx 1). Churn is checked. Contract emits `RegisterL1ValidatorMessage`.
3. Origin validators aggregate BLS signatures (round 1).
4. Operator or relayer submits `RegisterL1ValidatorTx` on the P-Chain.
5. P-Chain validators sign `L1ValidatorRegistrationMessage` (round 2).
6. `completeValidatorRegistration` (L1 tx 2).

That is two L1 transactions, one P-Chain transaction, two BLS aggregation rounds.

## Remove

1. `initiateValidatorRemoval` builds `L1ValidatorWeightMessage` with weight 0.
2. `SetL1ValidatorWeightTx` on the P-Chain.
3. `completeValidatorRemoval` consumes `L1ValidatorRegistrationMessage(valid=0)`.

## Failure versus removal

If a host dies, do **not** remove it. Restore the same NodeID from backup. Removal is a membership change. Restore is an infrastructure change.
