output "instance_ids" { value = aws_instance.validator[*].id }
output "private_ips" { value = aws_instance.validator[*].private_ip }
output "disk_kms_key_arn" { value = aws_kms_key.validator_disk.arn }
