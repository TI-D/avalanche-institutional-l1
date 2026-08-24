# Institutional Avalanche L1 Reference Deployment

A production-minded **design and kit skeleton** for a permissioned Avalanche L1. This is not a token, NFT, DeFi app, or a running bank chain.

Fictional customer: **Northstar Capital**. The documentation site is the portfolio surface. Terraform, Ansible, contracts, scripts, and runbooks are the unfinished kit.

- Site: `npm run dev` (port 43127)
- Public GitHub: https://github.com/TI-D/avalanche-institutional-l1
- Role: [Ava Labs Senior Forward Deployed Engineer](https://jobs.ashbyhq.com/ava-labs/444892f3-0872-4476-9d52-20c7f1b1f8d4)

## Evidence rule

No capability is called implemented, healthy, passed, or production-ready without a linked artifact.

Canonical table: `/readiness` (`src/lib/evidence.ts`).

| What you can run today | What it actually is |
| --- | --- |
| `npm run dev` / `/status` | Stage 1 JSON control-plane model |
| `./scripts/health` and other top-level scripts | POST/GET against that JSON API |
| `forge test --root contracts` | Authorization tests for ICM contracts |
| `./scripts/local/*` | Wrappers for a local AvalancheGo network that has not been booted here |
| `terraform/` / `ansible/` | Unvalidated skeleton. Gap list: `docs/aws-kit-gaps.md` |

## Run the documentation site

```bash
npm ci
npm run dev
```

`npm ci` must work. If it does not, the lockfile is wrong.

## Check

```bash
make bootstrap
make check
```

Requires Node 22 and Foundry. `make local-up` additionally needs avalanche-cli. That path has not been executed in this repository. See `CLAIMS.md`.

## Stage 2 (not executed)

`docs/stage-2-local.md`. Do not narrate it as done.

## Repository

```
contracts/     Foundry project: registry, receiver, tests
docs/          architecture, lifecycle, ICM, readiness, AWS gaps
runbooks/      drafts; Stage 1 scripts are not these drills
scripts/       Stage 1 model clients + unrun Stage 2 wrappers
src/           documentation site + model console
terraform/     unvalidated AWS skeleton
ansible/       unvalidated AvalancheGo role
```
