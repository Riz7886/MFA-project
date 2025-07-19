# Create a Public IP for the Firewall
resource "azurerm_public_ip" "fw_pip" {
  name                = "fw-public-ip"
  location            = var.location
  resource_group_name = var.resource_group_name
  allocation_method   = "Static"
  sku                 = "Standard"
}

# Create the Azure Firewall
resource "azurerm_firewall" "fw" {
  name                = "fw-healthcare"
  location            = var.location
  resource_group_name = var.resource_group_name
  sku_name            = "AZFW_VNet"
  sku_tier            = "Standard"

  ip_configuration {
    name                 = "fw-ipconfig"
    subnet_id = var.fw_subnet_id
    public_ip_address_id = azurerm_public_ip.fw_pip.id
  }
}

# Output the Firewall Public IP address
output "firewall_public_ip" {
  description = "Public IP address of the Azure Firewall"
  value       = azurerm_public_ip.fw_pip.ip_address
}
