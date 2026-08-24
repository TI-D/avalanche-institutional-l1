variable "name" {
  type        = string
  description = "L1 name from the customer overlay. Do not bake a customer into the module default."
}

variable "region" {
  type    = string
  default = "us-east-1"
}

variable "vpc_cidr" {
  type        = string
  description = "Customer VPC CIDR from the overlay."
}

variable "operator_cidrs" {
  type        = list(string)
  description = "Operator and jump CIDRs from the overlay. Never 0.0.0.0/0."
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
  type        = map(string)
  description = "Must include Customer from the overlay. Kit modules do not default to Northstar."
}
