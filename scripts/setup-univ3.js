const ethers = require('ethers');
const univ3F = require('../build/UniswapV3Factory.json');
const univ3NFPManager = require('../build/NonfungiblePositionManager.json');
const swapRouter = require('../build/SwapRouter.json');
const quoterV2 = require('../build/QuoterV2.json');
const accounts = require('../data/accounts/accounts.json');
const tokens = require('../data/addresses/tokens.json');
const bn = require('bignumber.js');
const knc = require('../build/KNC.json');
const usdt = require('../build/USDT.json');
const fs = require('fs');
const path = require('path');

bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 })

async function main() {
  const provider = ethers.getDefaultProvider('http://127.0.0.1:8652');
  const wallet = new ethers.Wallet(accounts.account1.privKey, provider);

  const univ3FFactory = new ethers.ContractFactory(univ3F.abi, univ3F.bytecode, wallet);
  const univ3FContract = await univ3FFactory.deploy();
  console.log(`univ3 factory address: ${univ3FContract.address}`);
  await univ3FContract.deployTransaction.wait();

  const nfpManagerFactory = new ethers.ContractFactory(univ3NFPManager.abi, univ3NFPManager.bytecode, wallet);
  const nfpManagerContract = await nfpManagerFactory.deploy(univ3FContract.address, tokens.WETH, '0x0000000000000000000000000000000000000000');
  console.log(`manager contract address: ${nfpManagerContract.address}`);

  // not use factory for now
  // const swapRouterFactory = new ethers.ContractFactory(swapRouter.abi, swapRouter.bytecode, wallet);
  // const swapRouterContract = await swapRouterFactory.deploy(univ3FContract.address, tokens.WETH);
  // console.log(`swap router address: ${swapRouterContract.address}`);

  const quoterV2Factory = new ethers.ContractFactory(quoterV2.abi, quoterV2.bytecode, wallet);
  const quoterV2Contract = await quoterV2Factory.deploy(univ3FContract.address, tokens.WETH);

  console.log(`quoter v2 address: ${quoterV2Contract.address}`);


  // approve
  const kncContract = new ethers.Contract(tokens.KNC, knc.abi, wallet);
  const usdtContract = new ethers.Contract(tokens.USDT, usdt.abi, wallet);

  /// nft manager
  await (await kncContract.approve(nfpManagerContract.address, '99999999999')).wait();
  console.log('KNC approved for NFT manager');
  await (await usdtContract.approve(nfpManagerContract.address, '99999999999')).wait();
  console.log('USDT approved for NFT manager');

  /// router
  /// not use factory for now
  // await (await kncContract.approve(swapRouterContract.address, '99999999999')).wait();
  // console.log('KNC approved for swap router');
  // await (await usdtContract.approve(swapRouterContract.address, '99999999999')).wait();
  // console.log('USDT approved for swap router');

  /// quoter v2
  await (await kncContract.approve(quoterV2Contract.address, '99999999999')).wait();
  console.log('KNC approved for Quoter V2');
  await (await usdtContract.approve(quoterV2Contract.address, '99999999999')).wait();
  console.log('USDT approved for Quoter V2');

  // createAndInitializePoolIfNecessary
  const data1 = await nfpManagerContract.populateTransaction.createAndInitializePoolIfNecessary(tokens.USDT, tokens.KNC, 3000, encodePriceSqrt(999999, 999999), { gasLimit: 100000000 });
  const data2 = await nfpManagerContract.populateTransaction.mint({
    token0: tokens.USDT,
    token1: tokens.KNC,
    fee: 3000,
    tickLower: getMinTick(60),
    tickUpper: getMaxTick(60),
    amount0Desired: '999999',
    amount1Desired: '999999',
    amount0Min: 0,
    amount1Min: 0,
    recipient: accounts.account1.address,
    deadline: 9999999999999,
  })
  const tx = await nfpManagerContract.multicall([data1.data, data2.data], { gasLimit: 100000000 });
  const receipt = await tx.wait();

  const pool = await univ3FContract.getPool(tokens.USDT, tokens.KNC, 3000);

  const obj = {
    'factory': univ3FContract.address,
    'manager': nfpManagerContract.address,
    'pool': pool,
    // 'swapRouter': swapRouterContract.address,
    'quoterV2': quoterV2Contract.address
  };

  fs.writeFileSync(path.resolve(__dirname, '..') + '/data/addresses/univ3.json', JSON.stringify(obj));
}

main().catch(console.log);

// returns the sqrt price as a 64x96
function encodePriceSqrt(reserve1, reserve0) {
  return ethers.BigNumber.from(
    new bn(reserve1.toString())
      .div(reserve0.toString())
      .sqrt()
      .multipliedBy(new bn(2).pow(96))
      .integerValue(3)
      .toString()
  )
}

function getMinTick(tickSpacing) {
  return Math.ceil(-887272 / tickSpacing) * tickSpacing;
}

function getMaxTick(tickSpacing) {
  return Math.floor(887272 / tickSpacing) * tickSpacing;
}
