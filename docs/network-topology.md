# Network topology

Intended:

```
operator CIDRs
    |
    +-- 443 --> private ALB + mTLS --> RPC (archive + pruned, different VM config)
    +-- 443 --> Grafana
    +-- SSM/jump --> validators / RPC / monitoring
```

What `terraform/` actually contains today:

```
operator CIDRs
    |
    +-- 443 --> internal NLB (no listener, no targets)
    +-- 443 SG on a monitoring EC2 that has no Grafana
    +-- 22 SG on a jump host that is not created
```

AvalancheGo is templated to bind HTTP to 127.0.0.1, so even a completed NLB could not reach it.

Validators would accept 9651 from their own security group. There is no private bootstrap list. `ifconfigme` behind one NAT can advertise one address for every validator.

Isolated subnets exist and have no default route. The backup bucket is not placed on them. Shared validator IAM can read every backup object.

See `docs/aws-kit-gaps.md`.
