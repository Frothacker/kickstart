'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var web3 = void 0;

if (typeof window !== 'undefined' && window.web3 !== 'undefined') {
  //we are in the browser, and metamast is running.
  web3 = new _web2.default(window.web3.currentProvider);
} else {
  // preloading from server OR user does not have metamask
  var provider = new _web2.default.providers.HttpProvider('https://rinkeby.infura.io/P9cWIMe0PO6n3SWQcYzE');
  web3 = new _web2.default(provider);
}

exports.default = web3;