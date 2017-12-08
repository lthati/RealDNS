'use strict';

var args = document.location.search.substr(1).split('&').map(str => str.split('=')).reduce((p, [name, value]) => {
  p[name] = value;
  return p;
}, {});

var a = document.querySelector('a');
a.textContent = args.ip;
a.href = 'https://isc.sans.edu/ipinfo.html?ip=' + args.ip;
if (args.flag) {
  document.querySelector('img').src = './flags/' + args.flag + '.png';
}

document.addEventListener('click', e => {
  let cmd = e.target.dataset.cmd;
  if (cmd) {
    chrome.runtime.sendMessage({cmd});
  }
});
