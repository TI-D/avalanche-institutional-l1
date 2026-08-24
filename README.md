# Institutional Avalanche L1 Reference Deployment

A production-minded reference for deploying and operating a **permissioned Avalanche L1** for a regulated institution. This is not a token, NFT, DeFi app, or hello-world chain.

Fictional customer: **Northstar Capital** wants a private EVM-compatible Avalanche L1 for tokenized financial assets. Validators stay on approved infrastructure. Public exposure is minimized. Operations are auditable. Node failure is recoverable. The network sends a real ICM message to a second chain.

The documentation site is the portfolio surface. The Terraform, Ansible, contracts, scripts, and runbooks are the reusable kit extracted from the engagement.

- Live site (this repo): `npm run dev`
- Public GitHub: https://github.com/TI-D/avalanche-institutional-l1
- Role this was built against: [Ava Labs Senior Forward Deployed Engineer](https://jobs.ashbyhq.com/ava-labs/444892f3-0872-4476-9d52-20c7f1b1f8d4)

## What this proves

1. Avalanche architecture: AvalancheGo, P-Chain registry, Subnet-EVM, restricted RPC, BLS, ValidatorManager
2. Validator lifecycle: add Validator 4, P-Chain registration, BLS aggregation, remove Validator 2, network stays healthy
3. Institutional security: IaC, segmentation, KMS, minimal ports, plus an honest HSM design that is **not** faked
4. Recovery: destroy a validator, keep consensus, restore from staking-key backup
5. ICM: `AssetApproved { assetId: 82731 }` on Northstar becomes `ApprovalReceived` on Settlement
6. Productization: customer-specific Northstar work extracted into this kit

Honesty is staged. Stage 1 is shipped (site + kit + control-plane model). Stage 2 is a real local AvalancheGo network (`docs/stage-2-local.md`). Stage 3 is the customer go-live plan (`docs/stage-3-go-live.md`). Do not collapse them.

## Run the documentation site and ops console

```bash
npm install
npm run dev
```

The console at `/status` is Stage 1: a control-plane model. Operator scripts talk to that API:

```bash
./scripts/health
./scripts/add-validator
./scripts/remove-validator
./scripts/backup
./scripts/restore
```

## Repository

```
terraform/     network, validators, rpc, monitoring, backup, aws overlay
ansible/       avalanchego, hardening
contracts/     institutional-registry, icm-demo
scripts/       deploy, health, add/remove validator, backup, restore
docs/          architecture, topology, lifecycle, ICM, threat model, DR, readiness
runbooks/      failure, replacement, upgrade, incident
src/           Avalanche-branded documentation site + ops console
```

Stage 2 (local AvalancheGo, $0 protocol cost):

```bash
./scripts/local/create-l1s
./scripts/local/up
```

Stage 3 (live customer) is a plan, not a command. `./scripts/deploy cloud` only prints the Terraform + Ansible path.

## Interview version

When I became interested in the role, I treated validator infrastructure and institutional Avalanche operations as the gap to close. I designed a permissioned EVM L1, implemented the validator lifecycle against ValidatorManager and the P-Chain, wired ICM to a second chain, automated the topology, and destroyed a validator to validate the recovery runbook. Northstar-specific policy stayed in the case study. The repeatable pieces became this kit.
