#!/usr/bin/python

from urllib2 import Request, urlopen
import os, sys
import json

token = os.getenv('INVESTIGATE_TOKEN', False)

if not token:
  print "ERROR: environment variable \'INVESTIGATE_TOKEN\' not set. Invoke script with \'INVESTIGATE_TOKEN=%YourToken% python scripts.py\'"
  sys.exit(1)

if len(sys.argv) == 2 :
    domain = sys.argv[1]
else :
    print "Please Enter Domain Name"
    sys.exit(1)

# domains/categorization

headers = {
  'Authorization': 'Bearer ' + token
}
request = Request('https://investigate.api.opendns.com/domains/categorization/' + domain, headers=headers)
#request = Request('https://investigate.api.opendns.com/domains/score/' + domain, headers=headers)

response_body = urlopen(request).read()

print response_body

#with open('data.txt', 'w') as outfile:  
#    json.dump(response_body, outfile)
#  
#with open('data.txt', 'r') as outfile:  
#    data = json.load(outfile)
#    #print data
#



#for d in data[0]:
#    print d["status"]
    
#print "domains/categorization: " + response_body
