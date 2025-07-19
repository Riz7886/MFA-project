output "vm_public_ips" {
  value = module.compute.public_ips
}

output "firewall_public_ip" {
  value = module.security.firewall_public_ip
}
