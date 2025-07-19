variable "location" {}
variable "resource_group_name" {}
variable "vnet_id" {}
variable "subnet_ids" {
  type = map(string)
}
variable "fw_subnet_id" {
  description = "Subnet ID for Azure Firewall"
}
