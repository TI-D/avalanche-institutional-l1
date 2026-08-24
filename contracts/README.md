# ICM application contracts

Foundry project. Interfaces match the Teleporter send/receive shape from ava-labs/icm-contracts (fetched 2026-08-24). They are not a git submodule of that repo yet.

```bash
forge test --root contracts -vv
```

`SettlementReceiver` requires the expected source blockchain and origin registry. Approvals are namespaced by origin.

`InstitutionalRegistry` takes an explicit relayer. `address(0)` means Teleporter-layer delivery is permissionless.

These contracts have not been deployed to an L1.
