document.body.style.border = "5px solid green";



/*var cls = Cc['@mozilla.org/network/dns-service;1'];
var iface = Ci.nsIDNSService;
var dns = cls.getService(iface); //dns object

var nsrecord = dns.resolve(HOSTNAME_HERE, true); //resolve hostname
var ip = "sravs";
while (nsrecord && nsrecord.hasMore()){
   ip = nsrecord.getNextAddrAsString(); //here you are
}
var hostname = window.location.hostname;
document.body = window.location.host;*/


function postData(input) {
    $.ajax({
        type: "POST",
        url: "/query_resolvers.py",
        data: { param: input },
        success: callbackFunc
    });
}

function callbackFunc(response) {
    // do something with the response
    document.title = response;
    console.log(response);
}

postData('input_1');