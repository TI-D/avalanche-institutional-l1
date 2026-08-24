# Stage 3: Take it live (if Northstar were real)

This stage is a plan, not a running environment. It is what I would put in front of a Director of Engineering after Stage 2 worked.

No production apply happens from this repo until a real customer signs the change window, funds the deployer, and names the PoA owners.

## Decision that Stage 2 does not make

Stage 2 proves the protocol path. Stage 3 proves the institution can operate it.

The customer still has to answer:

- Who are the PoA owners, and is that a 2-of-3 hardware set?
- Which CIDRs may reach RPC and Grafana?
- Is signing KMS-wrapped keys (implemented in this kit) or CloudHSM remote signing (designed, not built)?
- Is Settlement a second L1 they operate, or a market utility they only message?
- What is the RPO/RTO they will sign?

If those are still slides, you are not in Stage 3. You are still in discovery.

## Sequence

### 1. Engagement overlay

Copy the kit. Do not fork it.

Write a customer overlay, not new modules:

- `terraform.tfvars`: name, region, CIDRs, validator count, AMI, backup bucket
- genesis: EVM chain ID, fee config, Warp quorum, allowlists, pre-deployed ValidatorManager proxy
- PoA owner addresses
- ICM destination blockchain ID and Settlement receiver

Northstar-specific policy stays here. The kit stays generic.

### 2. Security review against the threat model

Walk `docs/threat-model.md` with their security architecture team before any VM exists.

Call out the implemented-versus-designed line in public:

- Implemented: private validators, restricted RPC, KMS envelope encryption, jump-only SSH, staking-key backup bucket
- Designed: CloudHSM remote signing, dual-control for `initiate*`, SIEM export, independent pentest

If they require HSM before first block, that is a kit gap. Do not pretend Terraform covers it. Schedule the signer sidecar as a scoped workstream.

### 3. Fuji dress rehearsal

Same ceremony as production, cheaper failures.

- Fund a deployer key from the [Builder Hub faucet](https://build.avax.network/tools/faucet). Move AVAX to P-Chain.
- `terraform apply` against a Fuji-sized footprint or a single-region subset.
- Ansible: AvalancheGo, hardening, `partial-sync-primary-network`.
- `CreateSubnetTx` → `CreateChainTx` → `ConvertSubnetToL1Tx`.
- `initializeValidatorSet` with the `SubnetToL1ConversionMessage`.
- Add one validator. Remove one. Destroy one host. Restore from backup. Send `AssetApproved`.
- Record the NodeIDs, conversion tx, and runbook timestamps. That packet is the go-live evidence.

Fuji AVAX is not money. The cloud bill is. Size the dress rehearsal down if they are paying.

### 4. Production apply

- Change window. Freeze unrelated work.
- Apply Terraform in the customer account. Keys never leave their KMS policy.
- Ansible rolling deploy. Confirm `P:OK` on every node before `track-subnets`.
- Create and convert the L1 from the funded production deployer. That deployer is not a laptop after this point.
- Initialize ValidatorManager. Verify contract set equals P-Chain set.
- Bring RPC and the allowlisted relayer last.

### 5. Drills on the real hosts

Do not skip these because Fuji worked.

1. Destroy one validator instance. Confirm 2/3 finalize. Restore the same NodeID.
2. Backup and restore staking material onto a replacement host.
3. Rolling AvalancheGo upgrade, one validator at a time, RPC last.
4. ICM: `assetId 82731` Northstar → Settlement. Trace Warp signatures.

If any drill fails, you are not live. You are in incident.

### 6. Cutover

- Applications point at the internal RPC NLB, never at a validator.
- PoA `initiate*` is frozen to the dual-control process.
- Relayer is allowlisted. No public volunteer relayer.
- Monitoring and log groups are in their SIEM, not only Grafana.

### 7. Handoff

Give them the kit, the overlay, the runbooks, and the Fuji + production evidence.

Then productize whatever was still bespoke. If three institutions needed the same signer, that becomes kit. If only Northstar needed that CIDR shape, it stays in the overlay.

## What I would refuse

- Public 9650 on a validator.
- A new NodeID generated "just to get it back up."
- Mainnet conversion before the destroy/restore drill.
- Claiming HSM is live because KMS encrypts the disk.

## Cost, order of magnitude

Local (Stage 2): $0 protocol, laptop only.

Fuji dress rehearsal: faucet AVAX plus whatever cloud footprint you actually apply. A trimmed 3-validator lab is a few hundred dollars a month if left up. Tear it down after the packet is collected.

Production: Ava's own avalanche-deploy sizing for a 5-validator + archive + pruned + monitoring stack is about $650/month on AWS us-east-1 before support staff. Add HSM, SIEM, and dual-region later as a second conversation, not as a surprise on the first invoice.
