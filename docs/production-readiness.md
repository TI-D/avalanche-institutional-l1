# Production readiness

Rule: no capability is called implemented, healthy, passed, or production-ready without a linked evidence artifact.

Canonical status table: the `/readiness` page, backed by `src/lib/evidence.ts`.

## Evidence levels

- `modeled`: JSON or prose simulation
- `source-written`: code exists, never executed against real Avalanche components
- `locally-executed`: ran against a local AvalancheGo network, with artifacts
- `fuji-executed`: Fuji transactions exist
- `aws-lab-executed`: disposable AWS apply exists
- `externally-validated`: another qualified person operated or reviewed it

## Stage 1 (this commit)

- Documentation site: locally executed when `make check` is green
- Ops console and `./scripts/{health,add-validator,backup,...}`: modeled
- ValidatorManager lifecycle write-up: source-written
- ICM contracts: source-written, Foundry tests locally executed
- Terraform / Ansible: source-written skeleton, see `docs/aws-kit-gaps.md`

## Stage 2

Plan: `docs/stage-2-local.md`. Wrappers exist. Not booted. No NodeIDs or tx hashes are checked in.

## Stage 3

Plan: `docs/stage-3-go-live.md`. No cloud apply. No Fuji or mainnet transactions.

If a walkthrough claims HSM is live, that Stage 1 registered a P-Chain validator, or that a recovery drill passed, that walkthrough is wrong.
