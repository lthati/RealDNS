import sys
import requests
import socket
import dns.resolver, dns.rdataclass
import threading

server_ips = set()

def worker(domain_name, resolver_ip):
    resolver = dns.resolver.Resolver()
    resolver.lifetime = 5
    resolver.nameservers = [resolver_ip]
    try:
        answer = resolver.query(domain_name, 'A')
    except Exception as e:
        print "Resolution from %s failed - %s" % (resolver_ip, str(e))
    else:
        for rdata in answer:
            #print repr(rdata)
            server_ips.add(rdata)


def resolve(domain_name):
    resolver_ips = ["208.69.35.11", "185.60.84.11", "208.69.32.73", "185.60.84.11", "146.112.128.11","208.69.36.11","204.194.238.11","208.69.33.65","67.215.86.11","204.194.237.11","208.69.34.66","204.194.239.11","185.60.86.11","208.67.219.11","146.112.129.11","208.67.216.11","67.215.80.65","67.215.83.11","185.60.87.11","67.215.84.11","67.215.85.11","208.69.37.11","67.215.95.91","67.215.93.129"]
    threads = []
    for resolver_ip in resolver_ips:
        t = threading.Thread(target=worker, args=(domain_name, resolver_ip,))
        threads.append(t)
    for t in threads:
        t.start()
    for t in threads:
        t.join()

    for ip in server_ips:
	    print ip

if __name__ == "__main__":
    resolve("internetbadguys.com")
