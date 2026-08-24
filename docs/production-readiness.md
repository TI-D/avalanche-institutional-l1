# Production readiness

Honesty is staged. See `docs/stage-2-local.md` and `docs/stage-3-go-live.md`.

## Stage 1: shipped

- Documentation site and ops console
- Modular Terraform and Ansible (written, not applied)
- Validator lifecycle and ICM contracts (written, not deployed)
- Operator scripts against the local JSON control plane
- Runbooks and the implemented-versus-designed line for HSM

## Stage 2: local AvalancheGo (next)

- `avalanche-cli` local Primary Network
- Northstar + Settlement L1s, Teleporter, relayer
- Real add/remove validator and a kill/restart drill
- Console pointed at live localhost RPC

Not started in this environment until `./scripts/local/up` is run.

## Stage 3: plan only

- Customer overlay, security review, Fuji dress rehearsal, production apply
- CloudHSM remote signing, dual-control PoA, SIEM, pentest remain designed

If a walkthrough claims HSM is live, or that Stage 1 registered a P-Chain validator, that walkthrough is wrong.
