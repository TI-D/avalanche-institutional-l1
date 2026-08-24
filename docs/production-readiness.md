# Production readiness

## Implemented and tested in this repo

- Modular Terraform for network, validators, RPC, monitoring, backup
- Restrictive security groups and no public validator IPs
- KMS-encrypted disks and backup bucket
- Ansible AvalancheGo install + host hardening
- Validator lifecycle and ICM contracts
- Operator scripts and runbooks
- Local control-plane demonstration

## Designed, not implemented

- CloudHSM / PKCS#11 remote signing for BLS and staking keys
- Dual-control (2-of-3) for PoA `initiate*` calls
- Institution SIEM export and full VPC flow retention
- Independent penetration test
- Fuji/mainnet ceremony with funded deployer keys (requires customer credentials)

If a walkthrough claims HSM is live, that walkthrough is wrong. The production design is in `docs/threat-model.md` and the security page of the site.
