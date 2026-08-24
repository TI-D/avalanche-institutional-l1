variable "name" { type = string }
variable "validator_count" {
  type    = number
  default = 3
}
variable "instance_type" {
  type    = string
  default = "c6a.xlarge"
}
variable "disk_gb" {
  type    = number
  default = 500
}
variable "ami_id" { type = string }
variable "private_subnet_ids" { type = list(string) }
variable "validator_sg_id" { type = string }
variable "backup_bucket_arn" { type = string }
variable "backup_kms_key_arn" { type = string }
variable "tags" {
  type    = map(string)
  default = {}
}
