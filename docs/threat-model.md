# Threat model

Status: source-written. Not reviewed by an independent security engineer.

## Assets

- BLS validator keys (Warp + registration)
- Staking TLS keys (NodeID)
- PoA owner key
- RPC write access
- Backup ciphertext and KMS key

## Top threats

1. Validator key theft. Impact: sign false Warp messages, equivocate. Mitigation intended: no public SSH, keys off operator laptops, production HSM. HSM is not implemented. Current Ansible path writes keys to `/etc/avalanchego/staking`.
2. Accidental public RPC. Impact: mempool spam, information leak, accidental contract calls. Current template binds HTTP to 127.0.0.1, which also blocks the unfinished NLB path.
3. PoA owner laptop compromise. Impact: rogue validator added. Dual-control is designed, not built.
4. Backup that restores a new NodeID. Impact: you think you recovered and you did not. Stage 1 health script does not assert NodeID equality against a real node.
5. Shared backup IAM. Impact: one compromised validator can read every identity object. This is present in `terraform/validators/main.tf` today.

## Out of scope for this reference

Nation-state compromise of AWS KMS, physical seizure of all three AZs, and social engineering of Northstar officers.
