const ethers = require('ethers');
const BN = require('bn.js');

const accounts = require('../data/accounts/accounts.json');

const knc = require('../build/KNC.json');
const usdt = require('../build/USDT.json');
const univ2F = require('../build/UniswapV2Factory.json')
const routerV2 = require('../build/UniswapV2Router02.json');
const weth = require('../build/WETH9.json');
const fs = require('fs');
const path = require('path');

async function main() {
  const provider = ethers.getDefaultProvider('http://127.0.0.1:8652');
  const wallet = new ethers.Wallet(accounts.account1.privKey, provider);

  const wethFactory = new ethers.ContractFactory(weth.abi, weth.bytecode, wallet);
  const wethContract = await wethFactory.deploy();
  console.log(`weth contract address: ${wethContract.address}`);
  await wethContract.deployTransaction.wait();

  const kncFactory = new ethers.ContractFactory(knc.abi, knc.bytecode, wallet);
  const kncContract = await kncFactory.deploy();
  console.log(`KNC address: ${kncContract.address}`);
  await kncContract.deployTransaction.wait();
  await (await kncContract.mint('9999999999999999999')).wait();
  console.log('KNC minted');

  const usdtFactory = new ethers.ContractFactory(usdt.abi, usdt.bytecode, wallet);
  const usdtContract = await usdtFactory.deploy();
  console.log(`USDT address: ${usdtContract.address}`);
  await usdtContract.deployTransaction.wait();
  await (await usdtContract.mint('9999999999999999999')).wait();
  console.log('USDT minted');

  const obj = {
    'WETH': wethContract.address,
    'KNC': kncContract.address,
    'USDT': usdtContract.address
  };

  fs.writeFileSync(path.resolve(__dirname, '..') + '/data/addresses/tokens.json', JSON.stringify(obj));
}

main().catch(console.log);
