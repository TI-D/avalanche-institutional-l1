# Interchain messaging

Northstar sends a single application message:

```
AssetApproved { assetId: 82731, approved: true }
```

Settlement records:

```
ApprovalReceived { sourceChain: Northstar, origin: InstitutionalRegistry, assetId: 82731 }
```

## Path

1. `InstitutionalRegistry.setApproval` calls `TeleporterMessenger.sendCrossChainMessage`.
2. If `allowedRelayer != address(0)`, Teleporter is given that one relayer. If it is zero, Teleporter-layer delivery is permissionless. That is a documented choice, not an implied allowlist.
3. Northstar validators sign the Warp message. BLS signatures aggregate.
4. A relayer delivers the bytes to Settlement and calls `receiveCrossChainMessage`.
5. `SettlementReceiver.receiveTeleporterMessage` requires:
   - `msg.sender == teleporter`
   - `sourceBlockchainID == expectedSourceBlockchainID`
   - `originSenderAddress == expectedOriginRegistry`
6. Approval state is namespaced by `(sourceBlockchainID, originSender, assetId)`.

Teleporter verifies Warp provenance. It does not pick the application origin for you.

## Evidence

- Source: `contracts/src/SettlementReceiver.sol`, `contracts/src/InstitutionalRegistry.sol`
- Tests: `contracts/test/` (`forge test`)
- Live delivery: not executed
