variable "name" { type = string }
variable "ami_id" { type = string }
variable "private_subnet_ids" { type = list(string) }
variable "monitoring_sg_id" { type = string }
variable "instance_type" {
  type    = string
  default = "t3.small"
}
variable "tags" {
  type    = map(string)
  default = {}
}
