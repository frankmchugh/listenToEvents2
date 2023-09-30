import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

import express from 'express';

const ethereumController = express();

const client = createPublicClient({
  chain: mainnet,
  transport: http('https://eth-mainnet.g.alchemy.com/v2/iXYPKPNVzY3OKROW2emJzNoE3ooToaRa'),
});


const abi = 
[{
  "type": "event",
  "name": "Deposit",
  "inputs": [
    {
      "indexed": true,
      "name": "",
      "type": "address"
    },
    {
      "indexed": false,
      "name": "",
      "type": "uint256"
    },
    {
      "indexed": false,
      "name": "",
      "type": "uint256"
    },
    {
      "indexed": false,
      "name": "",
      "type": "uint256"
    }
  ]
},
{
  "type": "event",
  "name": "Drain",
  "inputs": [
    {
      "indexed": true,
      "name": "",
      "type": "address"
    },
    {
      "indexed": false,
      "name": "",
      "type": "uint256"
    },
    {
      "indexed": false,
      "name": "",
      "type": "uint256"
    }
  ]
},
{
  "type": "function",
  "name": "deposit",
  "inputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "outputs": [],
  "stateMutability": "nonpayable",
  "payable": false
},
{
  "type": "function",
  "name": "drain",
  "inputs": [],
  "outputs": [],
  "stateMutability": "nonpayable",
  "payable": false
}]

function convertBigIntToJSON(obj) {
  if (typeof obj === 'bigint') {
    return obj.toString();
  } else if (Array.isArray(obj)) {
    return obj.map(convertBigIntToJSON);
  } else if (typeof obj === 'object') {
    for (const key in obj) {
      obj[key] = convertBigIntToJSON(obj[key]);
    }
  }
  return obj;
}



ethereumController.get('/getAll', async (req, res) => {
  try {
   

    const logs = await client.getContractEvents({
      address: '0xfAaBbE302750635E3F918385a1aEb4A9eb45977a',
      abi: abi,
      fromBlock: 18198548n,
    });

    const processedLogs = convertBigIntToJSON(logs);

    res.json(processedLogs);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default ethereumController;