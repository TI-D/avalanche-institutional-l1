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
| AvalancheGo | 1.14.0 commit dce38e90b1542fafa3c2b8efa8ef864d7a370eb6 | evidence/runs/20260824T202726Z/versions.txt (local boot). ansible/avalanchego still pins 1.13.5, unchecksummed, never run |
| Terraform | >= 1.6.0, AWS provider ~> 5.80 | terraform modules (never applied) |
| Avalanche CLI | 1.9.6 | evidence/runs/20260824T202726Z/versions.txt |
| Subnet-EVM | v0.8.0 | local `avalanche blockchain create --latest` |
| ICM relayer | icm-relayer-v1.7.4 | started by local deploy |
| ICM contracts | interface shape fetched 2026-08-24 from ava-labs/icm-contracts main | contracts/src/interfaces/ |
| Go (signer module) | 1.25.6 local / go 1.24.0 in signer/go.mod | `make signer-test` |
| AvalancheGo (module pin) | v1.14.0 | signer/go.mod |
| Envoy | 1.39.0 | `make network-policy-test` |
| OpenBao | 2.6.2 | `make backup-test` |
| restic | 0.19.1 | `make backup-test` |
| Prometheus | 3.14.0 | `make observe-test` |
| Loki | 3.7.6 | `make observe-test` |
