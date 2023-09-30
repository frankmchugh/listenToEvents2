const ethers = require("ethers");

const usdtABI = require("./usdt.json");

// Alchemy endpoint URL
const alchemyUrl = "https://eth-mainnet.g.alchemy.com/v2/iXYPKPNVzY3OKROW2emJzNoE3ooToaRa";

async function main() {
  const usdtAddress = "0xfAaBbE302750635E3F918385a1aEb4A9eb45977a";

  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const contract = new ethers.Contract(usdtAddress, usdtABI, provider);

  const filter = contract.filters.Deposit(); // Replace "Deposit" with the actual event name
  const filter2 = contract.filters.Drain();

  
  const events = await contract.queryFilter(filter);
  const events2 = await contract.queryFilter(filter2);

  events.forEach((event) => {
    const { from, amount } = event.args; // Access event parameters
    // Process event data here
    console.log(event);
  });
  events2.forEach((event) => {
    const { from, amount } = event.args; // Access event parameters
    // Process event data here
    console.log(event);
  });
}

main();




