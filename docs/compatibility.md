# Version pins

These are the versions this repo intends to use. They are not evidence that those binaries were run here.

| Component | Pin | Evidence in this repo |
| --- | --- | --- |
| Node.js | 22 | CI |
| Next.js | 16.3.2 | package.json |
| React | 19.2.8 | package.json |
| Solidity | 0.8.25 | contracts/foundry.toml (matches official ICM pragma) |
| Foundry solc | 0.8.25 | contracts/foundry.toml |
| forge-std | 9b91af55d5944be8fb986e6cb7cde7ad2d01b890 | contracts/lib/forge-std |
| AvalancheGo | 1.13.5 | ansible/avalanchego/tasks/main.yml (download not checksummed, never run) |
| Terraform | >= 1.6.0, AWS provider ~> 5.80 | terraform modules (never applied) |
| Avalanche CLI | unpinned | scripts/local/lib.sh install hint |
| ICM contracts | interface shape fetched 2026-08-24 from ava-labs/icm-contracts main | contracts/src/interfaces/ |

Stage 2 must replace "unpinned Avalanche CLI" and "interface shape" with exact CLI, AvalancheGo, Subnet-EVM, and icm-contracts commit hashes from a successful local boot.
