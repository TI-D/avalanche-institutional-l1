# Claims

Rule: no capability is called implemented, healthy, passed, or production-ready without a linked evidence artifact.

This file is the human-readable index. `/readiness` renders the same levels. A row may not say Passed until `evidence/runs/<id>/manifest.json` exists for that claim.

| Claim | Implementation mode | Verification command | Latest evidence | Known limitations |
| --- | --- | --- | --- | --- |
| Documentation site renders | locally-executed | `npm ci && npm run build` | this repository | Not Avalanche infrastructure |
| Stage 1 ops console | modeled | `./scripts/health` against `:43127` | `src/lib/control-plane.ts` | JSON only. No AvalancheGo |
| ValidatorManager lifecycle write-up | source-written | read `docs/validator-lifecycle.md` | that file | No P-Chain transactions |
| ICM origin authorization | source-written | `forge test --root contracts` | `contracts/test/` | Not deployed to an L1 |
| Local Northstar + Settlement L1s | source-written | `make local-up && make live-health` | none | Not booted in this repo |
| Validator add/remove on P-Chain | source-written | `make lifecycle-test` | none | CLI wrapper unrun |
| ICM AssetApproved delivery | source-written | `make icm-test` | none | No Teleporter receipt |
| Host-failure restore, same NodeID | modeled | `make recovery-test` | none | Stage 1 stamps JSON |
| Remote BLS signer prototype | source-written | signer tests | none | Not HSM-backed |
| Restricted peers + mTLS RPC | source-written | `make network-policy-test` | none | Not AWS security groups |
| Prometheus/Grafana/Loki | source-written | alert during a drill | none | No scrape pipeline |
| AWS deployment | source-written | `terraform fmt -check` | `docs/aws-kit-gaps.md` | Never applied |
| Hardware HSM custody | not implemented | — | — | Needs real hardware |
| Production / regulated customer | not implemented | — | — | Fictional engagement |

## What this repo will call things

| Phrase we will use | Phrase we will not use |
| --- | --- |
| Locally executed | Production-ready |
| Remote BLS signer prototype | HSM-backed |
| Linux namespaces / containers | AWS VPC |
| Envoy mTLS (when built) | ALB / NLB |
| OpenBao Transit (when built) | AWS KMS / CloudHSM |
| Restic encrypted repo (when built) | S3 Object Lock |

## Zero-cost sequence (reconciled)

Sprint 1 (this commit family): trustworthiness. Mostly done.

Sprint 2: real local Primary Network, Northstar, Settlement, live console. **Next.**

Sprint 3: real validator lifecycle + resumable operator path.

Sprint 4: live ICM through the already-tested contracts.

Sprint 5–8: signer prototype, backup/restore, restricted networks, observability. Local substitutes only.

Sprint 9: second overlay (Meridian) after the kit has been used once for real.

Do not start Sprint 5–9 until Sprint 2 produces advancing block heights. A proxy and a dashboard in front of a missing chain is still a simulator.
