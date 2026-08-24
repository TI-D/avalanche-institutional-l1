# Generated from overlay.json. Do not terraform apply from this laptop.
name                 = "meridian-l1"
region               = "eu-west-1"
vpc_cidr             = "10.81.0.0/16"
operator_cidrs       = ["10.81.10.0/24"]
validator_count      = 5
ami_id               = "ami-unspecified"
backup_bucket_name   = "meridian-l1-staking-backup"
tags = {
  Customer = "meridian-clearing"
  Environment = "reference"
  System = "avalanche-l1"
}
