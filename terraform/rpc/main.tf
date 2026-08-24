# Unvalidated skeleton. Internal NLB has no listener, target group, or
# attachments. See docs/aws-kit-gaps.md. Do not apply as a working RPC path.
terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.80"
    }
  }
}

resource "aws_kms_key" "rpc_disk" {
  description             = "${var.name} RPC EBS"
  deletion_window_in_days = 30
  enable_key_rotation     = true
  tags                    = var.tags
}

resource "aws_instance" "archive" {
  ami                         = var.ami_id
  instance_type               = var.archive_instance_type
  subnet_id                   = var.private_subnet_ids[0]
  vpc_security_group_ids      = [var.rpc_sg_id]
  associate_public_ip_address = false
  ebs_optimized               = true
  metadata_options { http_tokens = "required" }
  root_block_device {
    volume_size = var.archive_disk_gb
    volume_type = "gp3"
    encrypted   = true
    kms_key_id  = aws_kms_key.rpc_disk.arn
  }
  tags = merge(var.tags, { Name = "${var.name}-rpc-archive", Role = "avalanche-rpc-archive" })
}

resource "aws_instance" "pruned" {
  ami                         = var.ami_id
  instance_type               = var.pruned_instance_type
  subnet_id                   = var.private_subnet_ids[1]
  vpc_security_group_ids      = [var.rpc_sg_id]
  associate_public_ip_address = false
  ebs_optimized               = true
  metadata_options { http_tokens = "required" }
  root_block_device {
    volume_size = var.pruned_disk_gb
    volume_type = "gp3"
    encrypted   = true
    kms_key_id  = aws_kms_key.rpc_disk.arn
  }
  tags = merge(var.tags, { Name = "${var.name}-rpc-pruned", Role = "avalanche-rpc-pruned" })
}

resource "aws_lb" "rpc" {
  name               = "${var.name}-rpc"
  internal           = true
  load_balancer_type = "network"
  subnets            = var.private_subnet_ids
  tags               = merge(var.tags, { Name = "${var.name}-rpc-nlb" })
}
