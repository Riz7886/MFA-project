variable "location" {}
variable "resource_group_name" {}
variable "admin_username" {}
variable "admin_password" {
  sensitive = true
}
variable "subnet_ids" {
  type = map(string)
}
