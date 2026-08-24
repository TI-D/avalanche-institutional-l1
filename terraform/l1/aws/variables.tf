variable "name" {
  type    = string
  default = "northstar-l1"
}

variable "region" {
  type    = string
  default = "us-east-1"
}

variable "vpc_cidr" {
  type    = string
  default = "10.64.0.0/16"
}

variable "operator_cidrs" {
  type        = list(string)
  description = "Northstar operator and jump CIDRs. Never 0.0.0.0/0."
}

variable "validator_count" {
  type    = number
  default = 3
}

variable "ami_id" {
  type        = string
  description = "Hardened Ubuntu AMI."
}

variable "backup_bucket_name" {
  type = string
}

variable "tags" {
  type = map(string)
  default = {
    Customer    = "northstar-capital"
    Environment = "reference"
    System      = "avalanche-l1"
  }
}
