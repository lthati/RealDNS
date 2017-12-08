
     //'use strict';

var worker = new Worker('./geo.js');
var style = 'margin: 0; padding: 0; background: #fff; position: fixed; bottom: 20px; right: 30px; z-index: 100000000000; width: 160px; height: 24px; border: solid 1px #ccc; box-shadow: 0 0 2px #ccc;';

var tabs = {};


worker.onmessage = (e) => {
  let tabId = e.data.tabId;
  // is script injected
  if (tabs[tabId]) {
    chrome.tabs.sendMessage(tabId, {
      cmd: 'flag-resolved',
      ip: e.data.ip,
      flag: e.data.country
    });
    console.error('sending from worker', tabId);
    delete tabs[tabId];
  }
  else {
    tabs[tabId] = e.data;
  }
};

chrome.webRequest.onResponseStarted.addListener(details => {
  let ip = details.ip;
  if (ip) {
    worker.postMessage({
      ip: details.ip,
      tabId: details.tabId
    });
  }
}, {
  urls: ['<all_urls>'],
  types: ['main_frame']
}, [
  'responseHeaders' // to prevent "No tab with id" error
]);

chrome.runtime.onMessage.addListener((request, sender) => {
  let tabId = sender.tab.id;
  if (request.cmd === 'close-me') {
    chrome.tabs.sendMessage(tabId, request);
  }
  else if (request.cmd === 'injected') {
    // has flag already been resolved


    function runPyScript(input){
	<script></script>
	var jqXHR = $.ajax({
		type: "POST",
		url: "http://127.0.0.1/your/webservice",
		async: false,
		data: { mydata: input }
	    });

	return jqXHR.responseText;
    }

    var datatosend = 'this is my matrix';
    result = runPyScript(datatosend);
    console.log('Got back ' + result);



//       $.getJSON('http://localhost/your/webservice', 
// 		function(data, textStatus, jqXHR) {
// 		    alert(data);
// 		}
// 		)
    if (tabs[tabId]) {
      chrome.tabs.sendMessage(tabId, {
        cmd: 'flag-resolved',
	//        ip: tabs[tabId].ip,

        ip: '1.2.3.4 Spoofed',
	      flag: tabs[tabId].country
      });
      console.error('sending from onMessage', tabId);
      delete tabs[tabId];
    }
    // wait for flag to be resolved
    else {
      tabs[tabId] = true;
    }
  }
});

chrome.storage.local.get('version', (obj) => {
  let version = chrome.runtime.getManifest().version;
  if (obj.version !== version) {
    window.setTimeout(() => {
      chrome.storage.local.set({version}, () => {
        chrome.tabs.create({
          url: 'http://add0n.com/country-flags.html?from=server-ip&version=' + version + '&type=' + (obj.version ? ('upgrade&p=' + obj.version) : 'install')
        });
      });
    }, 3000);
  }
});
