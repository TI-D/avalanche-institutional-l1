# Generated from overlay.json. Do not terraform apply from this laptop.
name                 = "northstar-l1"
region               = "us-east-1"
vpc_cidr             = "10.64.0.0/16"
operator_cidrs       = ["10.64.10.0/24"]
validator_count      = 5
ami_id               = "ami-unspecified"
backup_bucket_name   = "northstar-l1-staking-backup"
tags = {
  Customer = "northstar-capital"
  Environment = "reference"
  System = "avalanche-l1"
}
