#!/usr/bin/python

from urllib2 import Request, urlopen
import os, sys
import json
import requests

def get_url_details(domain):
    headers = {
        'Authorization': 'Bearer ' + "e3af8f29-0f96-4131-a6f3-21bba789ceb9"
    }
    url = 'https://investigate.api.opendns.com/domains/categorization/' + domain
    response_body = requests.get(url, headers=headers).json()
    status = response_body[domain]['status']
    print status
    return str(status)

if __name__ == '__main__':
    token = os.getenv('INVESTIGATE_TOKEN', False)
    # if not token:
    #     print "ERROR: environment variable \'INVESTIGATE_TOKEN\' not set. Invoke script with \'INVESTIGATE_TOKEN=%YourToken% python scripts.py\'"
    #     sys.exit(1)

    
    if len(sys.argv) == 2 :
        domain = sys.argv[1]
        get_url_details(domain)
    else :
        print "Please Enter Domain Name"
        sys.exit(1)    
