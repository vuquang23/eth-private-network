const ethers = require('ethers');
const addresses = require('../data/addresses/addresses.json');
const factoryJSON = require('../artifacts/@uniswap/v2-core/contracts/UniswapV2Factory.sol/UniswapV2Factory.json');
const accounts = require('../data/accounts/accounts.json');
const knc = require('../artifacts/contracts/KNC.sol/KNC.json');
const usdt = require('../artifacts/contracts/USDT.sol/USDT.json');
const BN = require('bn.js');

async function factoryCreatePair() {
  const provider = ethers.getDefaultProvider('http://127.0.0.1:8652');
  const wallet = new ethers.Wallet(accounts.account1.privKey, provider);

  const contract = new ethers.Contract(addresses.uniV2Factory, factoryJSON.abi, wallet);
  const tx = await contract.createPair(addresses.USDT, addresses.KNC);
  console.log(tx);
  await tx.wait();
}

async function factoryGetPairs() {
  const provider = ethers.getDefaultProvider('http://127.0.0.1:8652');
  const wallet = new ethers.Wallet(accounts.account1.privKey, provider);

  const contract = new ethers.Contract(addresses.uniV2Factory, factoryJSON.abi, wallet);
  const tx = await contract.getPair(addresses.KNC, addresses.USDT);
  console.log(tx);
}

async function getCodePairKNCUSDT() {
  const provider = ethers.getDefaultProvider('http://127.0.0.1:8652');
  const wallet = new ethers.Wallet(accounts.account1.privKey, provider);

  const code = await provider.getCode(addresses.poolKNCnUSDT);
  console.log(code);
}


async function getTotalSupply(address, token) {
  const provider = ethers.getDefaultProvider('http://127.0.0.1:8652');
  const wallet = new ethers.Wallet(accounts.account1.privKey, provider);

  const contract = new ethers.Contract(address, token.abi, wallet);
  const value = await contract.totalSupply();
  console.log(value.toString());
}

async function mint(account, tokenAddress, token, amount) {
  const provider = ethers.getDefaultProvider('http://127.0.0.1:8652');
  const wallet = new ethers.Wallet(account.privKey, provider);

  const contract = new ethers.Contract(tokenAddress, token.abi, wallet);
  await contract.mint(amount);
}

async function main() {
  // await factoryCreatePair();

  // await factoryGetPairs();

  // await getCodePairKNCUSDT();

  // await mint(accounts.account2, addresses.USDT, usdt, '12312312');


  // await getTotalSupply(addresses.USDT, usdt);
  // await getTotalSupply(addresses.KNC, knc);

  
}


main().catch(console.log);