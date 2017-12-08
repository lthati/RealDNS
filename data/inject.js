'use strict';

var iframe;

chrome.runtime.onMessage.addListener(request => {
  if (request.cmd === 'close-me') {
    if (iframe) {
      iframe.parentNode.removeChild(iframe);
    }
  }
  else if (request.cmd === 'flag-resolved') {
    iframe = document.createElement('iframe');
    iframe.setAttribute('src', chrome.runtime.getURL('data/ip/ip.html') + '?ip=' + request.ip + '&flag=' + request.flag);
    iframe.setAttribute('style', `
      background-color: #fff;
      position: fixed;
      bottom: 20px;
      left: 30px;
      z-index: 100000000000;
      width: 500px;
      height: 48px;
      border: solid 1px #ccc;
      box-shadow: 0 0 2px #ccc;
    `);
    if (document.body) {
      document.body.appendChild(iframe);
    }
    else {
      document.addEventListener('DOMContentLoaded', () => document.body.appendChild(iframe), false);
    }
  }
});

chrome.runtime.sendMessage({
  cmd: 'injected'
});

//var currentLocation = document.URL
//console.log(currentLocation);


function get_ip_domain(arg1) {
    console.log('in get_ip_domain');
}

var currentLocation1 = window.location.hostname;

console.log('TESTING in inject.js');
document.title = currentLocation1;
console.log(currentLocation1);

//document.addEventListener('DOMContentLoaded', () => alert(window.top.getBrowser().selectedBrowser.contentWindow.location.href), false);

document.addEventListener('DOMContentLoaded', () => chrome.runtime.sendMessage({cmd: 'get_domain'}), false);

//browser.webRequest.onCompleted.addListener(get_ip_domain);
