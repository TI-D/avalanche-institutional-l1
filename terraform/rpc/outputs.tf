output "archive_private_ip" { value = aws_instance.archive.private_ip }
output "pruned_private_ip" { value = aws_instance.pruned.private_ip }
output "rpc_lb_dns" { value = aws_lb.rpc.dns_name }
