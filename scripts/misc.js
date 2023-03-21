const univ3Addrs = require('../data/addresses/univ3.json');
const quoterV2 = require('../build/QuoterV2.json');
const factory = require('../build/UniswapV3Factory.json');
const tokenAddrs = require('../data/addresses/tokens.json');
const ethers = require('ethers');
const accounts = require('../data/accounts/accounts.json');

async function main() {
  // const data = await provider.getCode('0xC3Ae5dCB08221A5D8A72839329C59104115D978A')

  const provider = ethers.getDefaultProvider('http://127.0.0.1:8652');
  const tx = await provider.getTransaction('0xf79e74cf82bf6659fcc788c5d09129698dffb1d08fc891613852cb7e3d8b9a34')
  console.log(tx);

  // const wallet = new ethers.Wallet(accounts.account1.privKey, provider);

  // const univ3FContract = new ethers.Contract(univ3Addrs.factory, factory.abi, wallet);

  // const pool = await univ3FContract.getPool(tokenAddrs.USDT, tokenAddrs.KNC, 3000);

  // console.log(pool);
}

main().catch(console.log);
