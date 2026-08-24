# Runbook: incident response

| Severity | Example | Action |
| --- | --- | --- |
| Sev1 | Loss of quorum, suspected key theft | Freeze PoA initiate calls. Preserve logs. Page leadership and counsel. |
| Sev2 | Single validator down, RPC degraded | Follow validator-failure. Keep producing blocks. |
| Sev3 | Metrics gap, non-urgent upgrade | Ticket and next change window. |

If a BLS key is *suspected* compromised, restore is the wrong move. That is a replacement ceremony plus a review of every Warp message signed in the window.
