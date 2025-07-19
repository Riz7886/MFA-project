module "network" {
  source              = "./modules/network"
  location            = var.location
  resource_group_name = var.resource_group_name
  vnet_cidr           = var.vnet_cidr
  subnet_app_cidr     = var.subnet_app_cidr
  subnet_db_cidr      = var.subnet_db_cidr
}

module "compute" {
  source              = "./modules/compute"
  location            = var.location
  resource_group_name = var.resource_group_name
  admin_username      = var.admin_username
  admin_password      = var.admin_password
  subnet_ids          = module.network.subnet_ids
}

module "security" {
  source              = "./modules/security"
  location            = var.location
  resource_group_name = var.resource_group_name
  vnet_id             = module.network.vnet_id
  subnet_ids          = module.network.subnet_ids
  fw_subnet_id        = module.network.fw_subnet_id 
  depends_on          = [module.network]
}
