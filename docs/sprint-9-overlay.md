# Sprint 9: Meridian overlay

The kit stays generic. Customer policy lives in `overlays/<customer>/`.

Northstar Capital already used the kit once (local AvalancheGo, lifecycle, ICM, recovery, Sprint 5-8 substitutes). Meridian Clearing is the second fictional institution. Same scripts. Different chain ID, CIDRs, token, ICM asset id, and intended PoA roles.

## What is in an overlay

- `overlay.json`: L1 create params and the AWS tfvars values Stage 3 would apply
- `terraform.tfvars`: generated from `overlay.json` by `make overlay-test`

Northstar-specific numbers do not belong in Terraform module defaults.

## What ran

`make overlay-test` validates both overlays are distinct, writes tfvars, and creates the Meridian L1 config (and deploys it when the local network is up) using the same `avalanche blockchain create/deploy` path as Northstar.

Recorded run: `evidence/runs/20260824T220210Z/`. Meridian RPC answered. Height 7 then 8 after `0x0472cfffb65ad2f52fea9063f172dac908a4d8600cc0a4aa0033c541cddda9a2`. The CLI relayer step failed because it still probed the dead Northstar RPC. Meridian ICM was not executed.

Local PoA owner is still ewoq. That is a local-test key. The overlay records intended officer roles, not issued hardware keys.

## Not this

- terraform apply
- Fuji
- Hardware HSM
- A fork of the kit
- A regulated customer
