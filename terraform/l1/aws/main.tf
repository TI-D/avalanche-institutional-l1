# Institutional overlay on the Ava Labs avalanche-deploy shape.
# Network, validators, RPC, monitoring, and backup are separate modules
# so the next customer can swap policy without rewriting compute.

terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.80"
    }
  }
}

provider "aws" {
  region = var.region
}

module "network" {
  source         = "../../network"
  name           = var.name
  vpc_cidr       = var.vpc_cidr
  operator_cidrs = var.operator_cidrs
  tags           = var.tags
}

module "backup" {
  source      = "../../backup"
  name        = var.name
  bucket_name = var.backup_bucket_name
  tags        = var.tags
}

module "validators" {
  source              = "../../validators"
  name                = var.name
  validator_count     = var.validator_count
  ami_id              = var.ami_id
  private_subnet_ids  = module.network.private_subnet_ids
  validator_sg_id     = module.network.validator_sg_id
  backup_bucket_arn   = module.backup.bucket_arn
  backup_kms_key_arn  = module.backup.kms_key_arn
  tags                = var.tags
}

module "rpc" {
  source             = "../../rpc"
  name               = var.name
  ami_id             = var.ami_id
  private_subnet_ids = module.network.private_subnet_ids
  rpc_sg_id          = module.network.rpc_sg_id
  tags               = var.tags
}

module "monitoring" {
  source             = "../../monitoring"
  name               = var.name
  ami_id             = var.ami_id
  private_subnet_ids = module.network.private_subnet_ids
  monitoring_sg_id   = module.network.monitoring_sg_id
  tags               = var.tags
}
