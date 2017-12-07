import sys
import requests

def main(hostname):
	inventory = requests.get('https://inventory.p1.opendns.com/v1/inventory.json').json()
	resolvers = [inventory["datacenters"][0]["serviceHosts"]["resolvers"]["m1.ams"]["ipv4_address"]]
	for resolver in resolvers:
		print resolver


if __name__ == "__main__":
    main(sys.argv)
