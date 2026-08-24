variable "name" { type = string }
variable "ami_id" { type = string }
variable "private_subnet_ids" { type = list(string) }
variable "rpc_sg_id" { type = string }
variable "archive_instance_type" {
  type    = string
  default = "c6a.xlarge"
}
variable "pruned_instance_type" {
  type    = string
  default = "c6a.large"
}
variable "archive_disk_gb" {
  type    = number
  default = 1000
}
variable "pruned_disk_gb" {
  type    = number
  default = 500
}
variable "tags" {
  type    = map(string)
  default = {}
}
