output "vpc_id" { value = aws_vpc.l1.id }
output "private_subnet_ids" { value = aws_subnet.private[*].id }
output "public_subnet_ids" { value = aws_subnet.public[*].id }
output "isolated_subnet_ids" { value = aws_subnet.isolated[*].id }
output "validator_sg_id" { value = aws_security_group.validators.id }
output "rpc_sg_id" { value = aws_security_group.rpc.id }
output "monitoring_sg_id" { value = aws_security_group.monitoring.id }
output "jump_sg_id" { value = aws_security_group.jump.id }
