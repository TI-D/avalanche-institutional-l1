output "monitoring_private_ip" { value = aws_instance.monitoring.private_ip }
output "log_group" { value = aws_cloudwatch_log_group.avalanche.name }
