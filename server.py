import flask
import query_resolvers
import urllib
from flask import Flask
from flask import request
app = Flask(__name__)
@app.route('/')
def display():
    return "Looks like it works!"
@app.route("/check_spoof")
def my_webservice():
    url = request.args.get('url')
    print url
    ip_addr = request.args.get('ip_addr')
    print ip_addr
    result = query_resolvers.resolve(url, ip_addr)
    print "result="+result
    return result
    #return 'Success'                                                                                                                       
#return flask.jsonify(result='testing')                                                                                                     
if __name__=='__main__':
    app.run(debug=True, port=80)
