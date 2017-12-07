import sys
import requests
import socket
import dns.resolver

def main(argv):
	inventory = requests.get('https://inventory.p1.opendns.com/v1/inventory.json').json()
	resolver_ips = [inventory["datacenters"][0]["serviceHosts"]["resolvers"]["m1.ams"]["ipv4_address"]]
	resolver = dns.resolver.Resolver()
	server_ips = set()
	for resolver_ip in resolver_ips:
		resolver.nameservers=[resolver_ip]
		for rdata in resolver.query("internetbadguys.com"):
			 server_ips.add(rdata)
	for ip in server_ips:
		print ip

if __name__ == "__main__":
    main(sys.argv)
