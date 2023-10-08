import { createPublicClient,  webSocket, createTestClient, http, publicActions, walletActions, custom  } from 'viem';
import { mainnet, foundry  } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts'





const transport = webSocket('wss://eth-mainnet.g.alchemy.com/v2/iXYPKPNVzY3OKROW2emJzNoE3ooToaRa');




const client = createTestClient({
  
  chain: foundry,
  mode: 'anvil',
 account: privateKeyToAccount('0x8A60D3742EE1c5E955E9680DF3e9f986b300F791'),
  transport: custom(window.ethereum)
})
  .extend(publicActions)
  .extend(walletActions)

const address =  await client.requestAddresses()







async function hash () {
  const hash = await client.sendTransaction({ 
    account: address,
    to: '0xfAaBbE302750635E3F918385a1aEb4A9eb45977a',
    value: 1000000000000000000n

  })

  console.log(hash)

}


hash()


