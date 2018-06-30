pragma solidity ^0.4.17;

contract CampaignFactory{
    address[] public deployedCampaigns;
    
    function createCampaign(uint64 minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns(address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    Request[] public requests;
    address public manager;
    uint64 public minimumContribution;
   //  tutorial uses 'approvers' not 'contributors'
    mapping(address => bool) public contributors;
    uint32 public contributorCount;

    modifier restricted {
        require(msg.sender == manager );
       _;
    }
    
    
    constructor(uint64 minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }
    
    function contribute() public payable{
        require(msg.value > minimumContribution);
        
        contributors[msg.sender] = true; // because false is default value in a mapping, so true indicates conribution 
        contributorCount++;
    }
    
    function createRequest(string description, uint value, address recipient) 
       public restricted {
        Request memory newRequest = Request({
           description: description, 
           value: value, 
           recipient: recipient, 
           complete: false,
           approvalCount: 0
        });
        
        requests.push(newRequest);
    }
    
    function approveRequest(uint16 index) public {
        Request storage r = requests[index];
        
        // make sure the address has contributed, but has not approved this one yet
        require(contributors[msg.sender]); 
        require(!r.approvals[msg.sender]);
           
        r.approvals[msg.sender] = true;
        r.approvalCount++;
    }
    
    function finalizeRequest(uint16 index) public restricted {
        Request storage r = requests[index];
        
        // make sure more than 50% of contributors approved this request
        require(r.approvalCount > (contributorCount / 2));
        //make sure that this request has not been completed before
        require(!r.complete);
        
        //make sure that there is enough wei in contract to fulfill transaction
        require(address(this).balance > r.value);
        
        //transfer value to supplier.  
        r.recipient.transfer(r.value);
        
        // mark this request as completed
        r.complete = true;
    }

    function getSummary() public view returns(
        uint64, uint, uint, uint32, address) {
        return(
            minimumContribution,
            address(this).balance,
            requests.length,
            contributorCount,
            manager
        );
    }
    
    function getRequestCount() public view returns (uint) {
        return requests.length;
    }
}