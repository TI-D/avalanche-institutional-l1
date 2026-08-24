# Threat model

## Assets

- BLS validator keys (Warp + registration)
- Staking TLS keys (NodeID)
- PoA owner key
- RPC write access
- Backup ciphertext and KMS key

## Top threats

1. Validator key theft. Impact: sign false Warp messages, equivocate. Mitigation: no public SSH, keys off operator laptops, production HSM (designed, not implemented).
2. Accidental public RPC. Impact: mempool spam, information leak, accidental contract calls. Mitigation: `http-host=127.0.0.1`, SG, internal NLB.
3. PoA owner laptop compromise. Impact: rogue validator added. Mitigation: dual-control (designed), freeze runbook.
4. Backup that restores a *new* NodeID. Impact: you think you recovered and you did not. Mitigation: health script asserts NodeID equality.

## Out of scope for this reference

Nation-state compromise of AWS KMS, physical seizure of all three AZs, and social engineering of Northstar officers.
