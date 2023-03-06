const ethers = require('ethers');

const accounts = require('../data/accounts/accounts.json');
const univ2F = require('../build/UniswapV2Factory.json');
const routerV2 = require('../build/UniswapV2Router02.json');
const tokens = require('../data/addresses/tokens.json');
const knc = require('../build/KNC.json');
const usdt = require('../build/USDT.json');
const fs = require('fs');
const path = require('path');

async function main() {
  const provider = ethers.getDefaultProvider('http://127.0.0.1:8652');
  const wallet = new ethers.Wallet(accounts.account1.privKey, provider);

  const univ2FFactory = new ethers.ContractFactory(univ2F.abi, univ2F.bytecode, wallet);
  const univ2FContract = await univ2FFactory.deploy(accounts.account1.address);
  console.log(`univ2 factory address: ${univ2FContract.address}`);
  await univ2FContract.deployTransaction.wait();

  const routerV2Factory = new ethers.ContractFactory(routerV2.abi, routerV2.bytecode, wallet);
  const routerV2Contract = await routerV2Factory.deploy(univ2FContract.address, tokens.WETH);
  console.log(`router V2 contract address: ${routerV2Contract.address}`);
  await routerV2Contract.deployTransaction.wait();

  const kncContract = new ethers.Contract(tokens.KNC, knc.abi, wallet);
  const usdtContract = new ethers.Contract(tokens.USDT, usdt.abi, wallet);

  await (await kncContract.approve(routerV2Contract.address, '99999999999')).wait();
  console.log('KNC approved');
  await (await usdtContract.approve(routerV2Contract.address, '99999999999')).wait();
  console.log('USDT approved');

  const kncApproved = await kncContract.allowance(accounts.account1.address, routerV2Contract.address);
  console.log(kncApproved.toString());
  const usdtApproved = await usdtContract.allowance(accounts.account1.address, routerV2Contract.address);
  console.log(usdtApproved.toString());

  const tx = await routerV2Contract.addLiquidity(
    tokens.KNC,
    tokens.USDT,
    '999999999',
    '999999999',
    '0',
    '0',
    accounts.account1.address,
    2677430914,
    { gasLimit: 10000000 }
  );
  await tx.wait();

  const pool = await univ2FContract.allPairs(0);

  const obj = {
    'factory': univ2FContract.address,
    'router': routerV2Contract.address,
    'knc_usdt_pool': pool,
  };

  fs.writeFileSync(path.resolve(__dirname, '..') + '/data/addresses/univ2.json', JSON.stringify(obj));
}

main().catch(console.log);
