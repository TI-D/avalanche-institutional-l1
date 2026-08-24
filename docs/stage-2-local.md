# Stage 2: Local AvalancheGo network

Cost: machine resources only. No AWS. No AVAX. No faucet.

This is the first time Northstar stops being a control-plane model and becomes a process list. Avalanche-CLI boots a local Primary Network, deploys two Subnet-EVM L1s, starts a relayer, and lets you add a validator through ValidatorManager.

Official path: [Deploy locally](https://build.avax.network/docs/tooling/avalanche-cli/create-deploy-avalanche-l1s/deploy-locally) and [Teleporter on a local network](https://build.avax.network/docs/tooling/avalanche-cli/cross-chain/teleporter-local-network).

## What must be true when Stage 2 is done

1. `avalanche network status` shows a running local network.
2. Northstar L1 and Settlement L1 both accept EVM RPC.
3. `InstitutionalRegistry.setApproval(82731, true)` on Northstar produces `ApprovalReceived` on Settlement.
4. `avalanche blockchain addValidator northstar --local` adds a fourth validator through PoAManager / P-Chain.
5. Killing one local validator process leaves the L1 finalizing. Restarting it restores the same NodeID.
6. The ops console reads live health from the local RPC instead of `/tmp/northstar-control-plane.json`.

Until those six are green, Stage 1 remains the demo.

## Machine

- 16 GB RAM recommended. Four AvalancheGo processes plus a relayer will sit down on 8 GB.
- AMD64 or ARM64 Linux / macOS. Disk for `~/.avalanche-cli` binaries and snapshots.
- Foundry (`forge`, `cast`) for contract deploy.

## Commands

```bash
# 1. Install CLI once
curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh | sh -s
export PATH="$HOME/bin:$PATH"

# 2. Create the two L1 configs (PoA, Teleporter on, relayer on)
./scripts/local/create-l1s

# 3. Boot the local Primary Network and deploy both chains
./scripts/local/up

# 4. Deploy InstitutionalRegistry + SettlementReceiver
./scripts/local/deploy-contracts

# 5. Prove ICM
./scripts/local/send-approval

# 6. Prove validator lifecycle
./scripts/local/add-validator
./scripts/local/remove-validator

# 7. Prove failure
./scripts/local/kill-validator 2
./scripts/local/health
./scripts/local/restart-validator 2

# 8. Point the site at live RPC
NORTHSTAR_RPC=http://127.0.0.1:<port>/ext/bc/<NORTHSTAR_CHAIN_ID>/rpc npm run dev
```

`./scripts/local/up` is a wrapper around:

```bash
avalanche blockchain create northstar \
  --evm --latest --proof-of-authority \
  --evm-chain-id 431271 --evm-token NSTAR --evm-defaults

avalanche blockchain create settlement \
  --evm --latest --proof-of-authority \
  --evm-chain-id 431272 --evm-token SETL --evm-defaults

avalanche blockchain deploy northstar --local
avalanche blockchain deploy settlement --local
```

CLI will download AvalancheGo and Subnet-EVM, start the local P/C-Chain validators, convert each Subnet to an L1, initialize ValidatorManager, deploy TeleporterMessenger / TeleporterRegistry, and start the ICM relayer.

## Mapping Stage 1 buttons to Stage 2

| Stage 1 console action | Stage 2 command |
| --- | --- |
| Health cards | `avalanche network status` + `eth_blockNumber` on both RPCs |
| Add Validator 4 | `avalanche blockchain addValidator northstar --local` |
| Remove Validator 2 | `avalanche blockchain removeValidator northstar --local --node-id <id>` |
| Destroy Validator 2 | `kill` the AvalancheGo pid. Do not remove it from ValidatorManager. |
| Restore Validator 2 | Restart that process with the same staking TLS / BLS files under `~/.avalanche-cli` |
| Send AssetApproved | `cast send` `setApproval(82731,true)` then watch Settlement `ApprovalReceived` |
| Backup / restore | Copy the node staking directory, wipe, restore, confirm NodeID |

## What Stage 2 still is not

- Not isolated networking. Everything is localhost.
- Not KMS or HSM. Keys live in the CLI data dir.
- Not the AWS Terraform stack.
- Not Fuji or mainnet.

Those belong to Stage 3.

## Exit criteria for the portfolio

A 3-minute recording: `up` → both RPCs live → add validator → ICM receipt → kill/restart a node → console showing the same NodeID. Narrate the two L1 transactions, the P-Chain transaction, and the two BLS rounds while they happen.
