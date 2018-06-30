const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  // deploy factory
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: '0x' + compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });

  await factory.methods.createCampaign('100').send({
    from: accounts[0], //note this account will assigned to 'manager' in campaign
    gas: '1000000'
  });

  //  es6 syntax array descructuring. `[index0] = array;` assigns the first value of array to 'index0'
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

  //create ABI interface in javascript.
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress //deployed at this address.
  );
});

describe('Campaigns', () => {
  it('deploys and factory and a campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('assigns the calling address to the manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it('marks an address as "contributor" when they donate (> minimum)', async () => {
    //contribute some value (>100wei)
    await campaign.methods
      .contribute()
      .send({ from: accounts[1], value: '101' }); // 100 is mimimun
    //contributors is mapping for addresses to boolean. didContrubute should be true
    const didContrubite = await campaign.methods
      .contributors(accounts[1])
      .call();
    assert(didContrubite);
  });

  it('requires a mimimun contribution', async () => {
    try {
      await campaign.methods.contribute().send({
        from: accounts[3],
        value: '7' // 100wei is set as minimum
      });
      assert(false); // this will run if contrubute() dosent work/run.
    } catch (err) {
      assert(err);
    }
  });

  it('allows a manager to create a payment request', async () => {
    await campaign.methods
      .createRequest('Test Request Creation', 200, accounts[9]) // inputs args are--> (description, value, recipient)
      .send({ from: accounts[0], gas: '1000000' });
    const r = await campaign.methods.requests(0).call();

    assert.equal(accounts[9], r.recipient);
    // ---- comented out becasue bad practice to have multiple asserts in 1 test.
    // assert.equal('Test Request Creation', r.description);
    // assert.equal(200, r.value);
    // assert.equal(0, r.approvalCount);
    // assert(!(r.complete));
  });

  it('processes requests', async () => {
    // contribute as manager
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether') // 100wei is set as minimum
    });

    let test = parseInt(web3.utils.toWei('5', 'ether'));

    //create request
    await campaign.methods
      .createRequest(
        'test request',
        web3.utils.toWei('5', 'ether'),
        accounts[8]
      ) // this account is the recipient
      .send({
        from: accounts[0],
        gas: '1000000'
      });
    //approve request
    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });

    // finalize request as manager
    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });

    // get balance after finalizing campaign
    let balance = await web3.eth.getBalance(accounts[8]);
    balance = web3.utils.fromWei(balance, 'ether');
    balance = parseFloat(balance);

    console.log("don't use accounts[8] in any other tests");

    assert.equal(105, balance);
  });
}); //describe campaigns end
