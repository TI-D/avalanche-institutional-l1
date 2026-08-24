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
| Remote BLS signer prototype | locally-executed | `make signer-test` | `evidence/runs/20260824T211518Z/test-results/signer.txt` | Local gRPC + avalanchego localsigner. Not HSM. Not attached to CLI validators. |
| Restricted peers + mTLS RPC | locally-executed | `make network-policy-test` | `evidence/runs/20260824T211518Z/test-results/mtls.txt` | Envoy on 127.0.0.1:9443 in front of Settlement :9656. Not AWS SGs. Not ALB. |
| OpenBao Transit + restic staking backup | locally-executed | `make backup-test` | `evidence/runs/20260824T211518Z/test-results/backup.txt` | Restored NodeID-BgLdV9zWyYUp6jp4RkxoDMvuMo6h8bj2w. Not AWS KMS / S3. `./scripts/backup` is still the JSON model. |
| Prometheus + Loki (no Grafana) | locally-executed | `make observe-test` | `evidence/runs/20260824T211518Z/test-results/observe.txt` | Scraped :9650 `/ext/metrics`. `AvalancheGoDown` fired because Northstar :9654 is down. Loki ingested that line. No Grafana. |
| Second customer overlay (Meridian) | locally-executed | `make overlay-test` | `evidence/runs/20260824T220210Z/test-results/overlay.txt` | Deployed chain ID 431273 on NodeID-CBerFpFqcctMGSFUVHjX9zPGrFfBWc94U. Height 7 then 8. Local PoA is still ewoq. Relayer/ICM for Meridian did not run. Not terraform apply. |
| AWS deployment | source-written | `terraform fmt -check` | `docs/aws-kit-gaps.md` | Never applied |
| Hardware HSM custody | not implemented | n/a | n/a | Needs real hardware |
| Production / regulated customer | not implemented | n/a | n/a | Fictional engagement |

## What this repo will call things

| Phrase we will use | Phrase we will not use |
| --- | --- |
| Locally executed | Production-ready |
| Remote BLS signer prototype | HSM-backed |
| Linux namespaces / containers | AWS VPC |
| Envoy mTLS (local) | ALB / NLB |
| OpenBao Transit (local -dev) | AWS KMS / CloudHSM |
| Restic encrypted repo (local) | S3 Object Lock |

## Zero-cost sequence (reconciled)

Sprint 1 (this commit family): trustworthiness. Mostly done.

Sprint 2: real local Primary Network, Northstar, Settlement, live console. Done for heights. See `evidence/runs/20260824T202726Z/`.

Sprint 3: real validator lifecycle + resumable operator path.

Sprint 4: live ICM through the already-tested contracts.

Sprint 5-8: locally executed. See `docs/sprint-5-8-local.md` and `evidence/runs/20260824T211518Z/`.

Sprint 9: Meridian overlay. See `docs/sprint-9-overlay.md`.

Do not start Sprint 5-9 until Sprint 2 produces advancing block heights. A proxy and a dashboard in front of a missing chain is still a simulator.
