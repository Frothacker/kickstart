import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

//create interface for factory
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xa84B13cEa2545B53AAbA0C60A82566478F8cdaFA' // update address if contract is re-deployed
);

export default instance;
