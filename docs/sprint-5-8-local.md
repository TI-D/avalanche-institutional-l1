# Sprint 5-8: local substitutes

Cost: this machine only. No AWS. No HSM. No Fuji.

These four claims are locally executed when `make sprint-5-8` writes `evidence/runs/<utc>/`.

| Claim | Local substitute | Not this |
| --- | --- | --- |
| Remote BLS signer prototype | Go gRPC server implementing AvalancheGo `signer.proto`, verified with `rpcsigner.NewClient` | HSM-backed, Cubist, attached to the running CLI validators |
| Restricted RPC | Envoy requiring a client certificate in front of a live local HTTP RPC | AWS security groups, ALB, AvalancheGo staking allowlist |
| Backup | OpenBao `-dev` Transit wrapping a restic password, then restic backup/restore of staking material from `flags.json` | AWS KMS, S3 Object Lock, `./scripts/backup` (that script is still the JSON model) |
| Observability | Prometheus scrape of `/ext/metrics` plus a firing `AvalancheGoDown` alert, and a Loki line for the drill | CloudWatch, a Grafana dashboard |

## Commands

```bash
make sprint-5-8
```

That installs binaries under `~/.cache/northstar-local-tools` if they are missing, then runs:

- `make signer-test`
- `make network-policy-test`
- `make backup-test`
- `make observe-test`

## Honest limits

- The signer key is a local file for that process. It is not in an HSM.
- CLI validators were not restarted onto `--staking-rpc-signer-endpoint`. Doing that would replace the Stage 2 NodeIDs.
- Envoy listens on `127.0.0.1:9443`. If the upstream RPC is down, the proxy is still a simulator.
- OpenBao runs `-dev`. The restic repo stays in `.data/` (gitignored).
- Grafana is not installed. Loki is a single local process.
- Hardware HSM, AWS, Fuji, and a regulated customer remain not implemented.
