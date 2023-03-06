const ethers = require('ethers');
// const addresses = require('../data/addresses/addresses.json');
// const factoryJSON = require('../artifacts/@uniswap/v2-core/contracts/UniswapV2Factory.sol/UniswapV2Factory.json');
const accounts = require('../data/accounts/accounts.json');
// const knc = require('../artifacts/contracts/KNC.sol/KNC.json');
// const usdt = require('../artifacts/contracts/USDT.sol/USDT.json');
// const BN = require('bn.js');

const router = require('../build/UniswapV2Router02.json');
const tokens = require('../data/addresses/tokens.json');
const univ2Addr = require('../data/addresses/univ2.json');
const pool = require('../build/UniswapV2Pair.json');

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

async function swapKNCToUSDT() {
  const provider = ethers.getDefaultProvider('http://127.0.0.1:8652');
  const wallet = new ethers.Wallet(accounts.account1.privKey, provider);

  // console.log(await provider.getCode('0x11B56d92cEaFCB3Fb0B9eFA42e2768d01F9d77dC'));

  const poolContract = new ethers.Contract(univ2Addr.knc_usdt_pool, pool.abi, wallet);
  const res = await poolContract.getReserves();
  console.log(res[0].toString(), res[1].toString());

  const routerContract = new ethers.Contract(univ2Addr.router, router.abi, wallet);
  const tx = await routerContract.populateTransaction.swapExactTokensForTokens(
    '10000', '0', [tokens.KNC, tokens.USDT], accounts.account1.address, 99999999999);

  console.log(tx);
}


async function getTx(tx) {
  const provider = ethers.getDefaultProvider('http://127.0.0.1:8652');
  const data = await provider.getTransactionReceipt(tx);
  console.log(data);
}

async function main() {
  // await factoryCreatePair();

  // await factoryGetPairs();

  // await getCodePairKNCUSDT();

  // await mint(accounts.account2, addresses.USDT, usdt, '12312312');


  // await getTotalSupply(addresses.USDT, usdt);
  // await getTotalSupply(addresses.KNC, knc);

  await swapKNCToUSDT();

  // await getTx('0xbc3db771a060c3ffea1fbb73918ec3584b437b21fbceaa6fbdbe7bbb25b2a47f');
}


main().catch(console.log);