const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// get bath to 'build' folder
const buildPath = path.resolve(__dirname, 'build');
// use filesystem to deleve 'build' folder
fs.removeSync(buildPath);


// get path to 'campaign.sol'
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
//get contents of 'campaign.sol'
const source = fs.readFileSync(campaignPath, 'utf8');
//compile contents and pull off 'contracts'
const output = solc.compile(source, 1).contracts;

console.log(output);


//create 'build' folder
fs.ensureDirSync(buildPath);

// loop thorugh the two keys in 'output', which point to campaign and campaignFactory
for (let contract in output) {
  //write a json file to a place, takes 1. a location/name and 2. content
  fs.outputJsonSync(
    //this is the location, +name
    path.resolve(buildPath, contract.replace(':', '') + '.json'),  
    // references the content using 'contract' as the key to output hash map. 
    output[contract]
    );
}

//video 132 in ethereum course










