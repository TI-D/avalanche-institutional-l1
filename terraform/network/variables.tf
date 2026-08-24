variable "name" {
  type        = string
  description = "Name prefix, for example northstar-l1."
}

variable "vpc_cidr" {
  type        = string
  default     = "10.64.0.0/16"
  description = "Non-overlapping institutional CIDR."
}

variable "operator_cidrs" {
  type        = list(string)
  description = "Corporate or jump CIDRs allowed to reach RPC, Grafana, and SSH."
}

variable "tags" {
  type    = map(string)
  default = {}
}
