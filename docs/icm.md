# Interchain messaging

Northstar sends a single application message:

```
AssetApproved { assetId: 82731, approved: true }
```

Settlement records:

```
ApprovalReceived { sourceChain: Northstar, assetId: 82731 }
```

## Path

1. `InstitutionalRegistry.setApproval` calls `TeleporterMessenger.sendCrossChainMessage`.
2. Northstar validators sign the Warp message. BLS signatures aggregate.
3. The allowlisted relayer delivers the bytes to Settlement and calls `receiveCrossChainMessage`.
4. `SettlementReceiver.receiveTeleporterMessage` decodes the payload.

No extra trust committee. Verification uses the origin validator set and weights already stored on the P-Chain.

The relayer is infrastructure, not a custodian. It cannot forge a message the origin validators did not sign.
