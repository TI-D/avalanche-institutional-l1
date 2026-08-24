# Network topology

```
operator CIDRs
    |
    +-- 443 --> internal NLB --> RPC (archive + pruned)
    +-- 443 --> Grafana
    +-- 22  --> jump host --> validators / RPC / monitoring
```

Validators accept 9651 only from each other. They accept 9650 only from the RPC and monitoring security groups. They have no public IPs.

Primary Network peering uses NAT. Validators partial-sync the P-Chain. They do not archive C-Chain.

Isolated subnets hold the backup path to KMS-encrypted S3. Those subnets have no 0.0.0.0/0 route.
