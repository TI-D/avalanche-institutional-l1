# Claims

Rule: no capability is called implemented, healthy, passed, or production-ready without a linked evidence artifact.

This file is the human-readable index. `/readiness` renders the same levels. A row may not say Passed until `evidence/runs/<id>/manifest.json` exists for that claim.

| Claim | Implementation mode | Verification command | Latest evidence | Known limitations |
| --- | --- | --- | --- | --- |
| Documentation site renders | locally-executed | `npm ci && npm run build` | this repository | Not Avalanche infrastructure |
| Stage 1 ops console | modeled | `./scripts/health` against `:43127` | `src/lib/control-plane.ts` | JSON only. No AvalancheGo |
| ValidatorManager lifecycle write-up | source-written | read `docs/validator-lifecycle.md` | that file | No P-Chain transactions |
| ICM origin authorization | locally-executed | `forge test --root contracts` and `make icm-test` | `evidence/runs/20260824T202726Z/transactions.json` | Foundry still covers auth. Delivery required a long-lived icm-relayer process, not `avalanche interchain relayer start`. |
| Local Northstar + Settlement L1s | locally-executed | `make local-up && make live-health` | `evidence/runs/20260824T202726Z/manifest.json` | CLI default: 2 primary + 1 AvalancheGo per L1. Heights increment on tx, not idle 8s. Not a 5-validator quorum. |
| Validator add/remove on P-Chain | locally-executed | `make lifecycle-test NODE_ID=...` | `evidence/runs/20260824T202726Z/transactions.json` | Needs a live signature-aggregator at 127.0.0.1:9092. CLI `signatureAggregator start` did not stay up. |
| ICM AssetApproved delivery | locally-executed | `make icm-test` | `evidence/runs/20260824T202726Z/transactions.json` | Relayer must stay running. First 120s wait failed because CLI start died. |
| Host-failure restore, same NodeID | locally-executed | `make recovery-test` | `evidence/runs/20260824T202726Z/transactions.json` | 1-of-1: kill stalls that L1. Restored NodeID-CNhskLG4ridbbTh2rDVjuTNEWfP2cFmwT. Not a quorum. |
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

Sprint 2: real local Primary Network, Northstar, Settlement, live console. Done for heights. See `evidence/runs/20260824T202726Z/`.

Sprint 3: real validator lifecycle + resumable operator path.

Sprint 4: live ICM through the already-tested contracts.

Sprint 5–8: signer prototype, backup/restore, restricted networks, observability. Local substitutes only.

Sprint 9: second overlay (Meridian) after the kit has been used once for real.

Do not start Sprint 5–9 until Sprint 2 produces advancing block heights. A proxy and a dashboard in front of a missing chain is still a simulator.
