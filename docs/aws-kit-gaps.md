# AWS kit gap matrix

Status: source written. Not applied. Not validated. This is an unvalidated design skeleton.

Do not call this a deployment kit until the rows below are closed or explicitly accepted.

| Claim on the old site | What the code actually does | Gap |
| --- | --- | --- |
| Private ALB + mTLS | `terraform/rpc/main.tf` creates an internal NLB with no listener, target group, or instance attachments | No request path from CIDR to AvalancheGo |
| RPC on 443 | RPC security group allows 443. AvalancheGo template binds HTTP to `127.0.0.1:9650`. Nothing terminates TLS or forwards 443 to 9650 | Load balancer cannot reach the node |
| Archive vs pruned RPC | Two EC2 sizes and disk sizes. Same Ansible `config.json.j2` | Storage behavior is identical |
| Restricted validator peers | SG allows 9651 to itself. `public-ip-resolution-service` is `ifconfigme`. No private bootstrap list, no `staking-host`, no advertised private addresses | Validators behind one NAT can publish the same public IP |
| Jump host | `aws_security_group.jump` exists. No instance, no SSM | SSH rules point at a host that is not created |
| Isolated backup subnets | Isolated subnets have no default route. Backup S3 is a regional bucket. Validators use the shared instance role | Isolated subnets are unused |
| Per-validator backup isolation | One IAM role, `s3:GetObject` on `bucket/*`, decrypt with the shared backup KMS key | Compromise validator 1, read validator 2's identity |
| Monitoring | One EC2 tagged prometheus-grafana plus a CloudWatch log group | No scrape, dashboard, alert, or log shipper |
| Object Lock / immutable audit | Versioning and lifecycle only | No Object Lock, no bucket policy, no cross-account recovery |
| Single NAT | One NAT in `public[0]` | Cross-AZ dependency |
| Verified AvalancheGo binary | `get_url` of a GitHub tarball, no checksum | Supply-chain gap |

## What would make this an AWS lab

1. Choose ALB+mTLS or NLB+proxy in an ADR, then implement listeners, targets, health checks, and a bind address the balancer can reach.
2. Configure private staking hosts and bootstrap NodeIDs.
3. Split backup IAM and KMS per validator.
4. Provision jump/SSM and VPC endpoints for S3/KMS.
5. `terraform apply` in a disposable account, then destroy.
6. Keep the apply/destroy transcript in `evidence/`.
