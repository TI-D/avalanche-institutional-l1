# Runbook: incident response

**Stage 1 warning:** there is no paging, SIEM, or live chain. This is a draft.

| Severity | Trigger | Immediate action |
| --- | --- | --- |
| Sev1 | Accepted height stopped, or suspected key theft | Fence affected hosts. Freeze PoA initiate calls. Preserve logs. Page leadership and counsel. |
| Sev2 | One validator down, height still advancing | Fence the down host. Follow validator-failure.md. Do not re-key. |
| Sev3 | RPC or relayer degraded, consensus progressing | Follow the specific component runbook. Keep a timeline. |

If a key is suspected, that is a replacement ceremony, not a restore.
