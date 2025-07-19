resource "azurerm_network_interface" "nic_app" {
  name                = "nic-app-vm"
  location            = var.location
  resource_group_name = var.resource_group_name
  ip_configuration {
    name                          = "internal"
    subnet_id                     = var.subnet_ids["app"]
    private_ip_address_allocation = "Dynamic"
  }
}

resource "azurerm_network_interface" "nic_db" {
  name                = "nic-db-vm"
  location            = var.location
  resource_group_name = var.resource_group_name
  ip_configuration {
    name                          = "internal"
    subnet_id                     = var.subnet_ids["db"]
    private_ip_address_allocation = "Dynamic"
  }
}

resource "azurerm_windows_virtual_machine" "app_vm" {
  name                  = "vm-app"
  resource_group_name   = var.resource_group_name
  location              = var.location
  size                  = "Standard_DS2_v2"
  admin_username        = var.admin_username
  admin_password        = var.admin_password
  network_interface_ids = [azurerm_network_interface.nic_app.id]
  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }
  source_image_reference {
    publisher = "MicrosoftWindowsServer"
    offer     = "WindowsServer"
    sku       = "2022-Datacenter"
    version   = "latest"
  }
}

resource "azurerm_linux_virtual_machine" "db_vm" {
  name                  = "vm-db"
  resource_group_name   = var.resource_group_name
  location              = var.location
  size                  = "Standard_DS2_v2"
  admin_username        = var.admin_username
  admin_password        = var.admin_password
  network_interface_ids = [azurerm_network_interface.nic_db.id]
  disable_password_authentication = false 
  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }
  source_image_reference {
  publisher = "Canonical"
  offer     = "UbuntuServer"
  sku       = "22_04-lts"
  version   = "latest"
}

  }

output "public_ips" {
  value = [
    azurerm_windows_virtual_machine.app_vm.public_ip_address,
    azurerm_linux_virtual_machine.db_vm.public_ip_address
  ]
}
