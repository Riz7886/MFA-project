variable "location" {
  default = "eastus2"
}

variable "resource_group_name" {
  default = "rg-healthcare-secure"
}

variable "admin_username" {
  description = "Admin username for VMs"
  default     = "azureadmin"
}

variable "admin_password" {
  description = "Admin password for VMs"
  type        = string
  sensitive   = true
}

variable "vnet_cidr" {
  default = "10.10.0.0/16"
}

variable "subnet_app_cidr" {
  default = "10.10.1.0/24"
}

variable "subnet_db_cidr" {
  default = "10.10.2.0/24"
}
