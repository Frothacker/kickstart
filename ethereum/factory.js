import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

//create interface
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x4579780386643F679FC5D70c18404005699ff3cB' // update address if contract is re-deployed
);
  

export default instance;