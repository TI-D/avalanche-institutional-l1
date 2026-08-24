terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.80"
    }
  }
}

resource "aws_kms_key" "validator_disk" {
  description             = "${var.name} validator EBS"
  deletion_window_in_days = 30
  enable_key_rotation     = true
  tags                    = var.tags
}

resource "aws_iam_role" "validator" {
  name = "${var.name}-validator"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy" "validator" {
  name = "${var.name}-validator"
  role = aws_iam_role.validator.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["s3:PutObject", "s3:GetObject"]
        Resource = "${var.backup_bucket_arn}/*"
      },
      {
        Effect   = "Allow"
        Action   = ["kms:Decrypt", "kms:GenerateDataKey"]
        Resource = [aws_kms_key.validator_disk.arn, var.backup_kms_key_arn]
      }
    ]
  })
}

resource "aws_iam_instance_profile" "validator" {
  name = "${var.name}-validator"
  role = aws_iam_role.validator.name
}

resource "aws_instance" "validator" {
  count                       = var.validator_count
  ami                         = var.ami_id
  instance_type               = var.instance_type
  subnet_id                   = var.private_subnet_ids[count.index % length(var.private_subnet_ids)]
  vpc_security_group_ids      = [var.validator_sg_id]
  iam_instance_profile        = aws_iam_instance_profile.validator.name
  associate_public_ip_address = false
  ebs_optimized               = true
  metadata_options {
    http_tokens = "required"
  }
  root_block_device {
    volume_size = var.disk_gb
    volume_type = "gp3"
    encrypted   = true
    kms_key_id  = aws_kms_key.validator_disk.arn
  }
  tags = merge(var.tags, {
    Name = "${var.name}-validator-${count.index + 1}"
    Role = "avalanche-validator"
  })
}
