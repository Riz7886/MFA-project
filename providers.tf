terraform {
  required_version = ">= 1.4.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.90.0"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 2.50.0"
    }
  }
}

provider "azurerm" {
  features {}
}

provider "azuread" {}

# Authenticate via Azure CLI (already logged in)
