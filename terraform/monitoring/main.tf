# Unvalidated skeleton. EC2 placeholder plus a disconnected log group.
# No Prometheus, Grafana, or alerts. See docs/aws-kit-gaps.md.
terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.80"
    }
  }
}

resource "aws_instance" "monitoring" {
  ami                         = var.ami_id
  instance_type               = var.instance_type
  subnet_id                   = var.private_subnet_ids[0]
  vpc_security_group_ids      = [var.monitoring_sg_id]
  associate_public_ip_address = false
  metadata_options { http_tokens = "required" }
  root_block_device {
    volume_size = 50
    volume_type = "gp3"
    encrypted   = true
  }
  tags = merge(var.tags, { Name = "${var.name}-monitoring", Role = "prometheus-grafana" })
}

resource "aws_cloudwatch_log_group" "avalanche" {
  name              = "/${var.name}/avalanchego"
  retention_in_days = 365
  tags              = var.tags
}
