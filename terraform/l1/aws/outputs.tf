output "validator_ips" { value = module.validators.private_ips }
output "rpc_lb_dns" { value = module.rpc.rpc_lb_dns }
output "backup_bucket" { value = module.backup.bucket_name }
output "vpc_id" { value = module.network.vpc_id }
