'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('./web3');

var _web2 = _interopRequireDefault(_web);

var _CampaignFactory = require('./build/CampaignFactory.json');

var _CampaignFactory2 = _interopRequireDefault(_CampaignFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//create interface for factory
var instance = new _web2.default.eth.Contract(JSON.parse(_CampaignFactory2.default.interface), '0xa84B13cEa2545B53AAbA0C60A82566478F8cdaFA' // update address if contract is re-deployed
);

exports.default = instance;