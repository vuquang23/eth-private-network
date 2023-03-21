const univ3Addrs = require('../data/addresses/univ3.json');
const quoterV2 = require('../build/QuoterV2.json');
const tokenAddrs = require('../data/addresses/tokens.json');
const ethers = require('ethers');
const accounts = require('../data/accounts/accounts.json');

async function swapKNCToUSDT() {
  const provider = ethers.getDefaultProvider('http://127.0.0.1:8652');
  const wallet = new ethers.Wallet(accounts.account1.privKey, provider);

  const quoterV2Contract = new ethers.Contract(univ3Addrs.quoterV2, quoterV2.abi, wallet);
  const tx = await quoterV2Contract.populateTransaction.quoteExactInputSingle([
    tokenAddrs.USDT,
    tokenAddrs.KNC,
    500,
    3000,
    0
  ], { gasLimit: 100000000 });
  console.log(tx);
}

async function main() {
  await swapKNCToUSDT();
}

main().catch(console.log);
