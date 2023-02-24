const ethers = require('ethers');
const accounts = require('../data/accounts/accounts.json');

const knc = require('../artifacts/contracts/KNC.sol/KNC.json');
const usdt = require('../artifacts/contracts/USDT.sol/USDT.json');

async function deployKNC() {
  const provider = ethers.getDefaultProvider('http://127.0.0.1:8652');
  const wallet = new ethers.Wallet(accounts.account1.privKey, provider);
  const factory = new ethers.ContractFactory(knc.abi, knc.bytecode, wallet);
  const contract = await factory.deploy();
  await contract.deployTransaction.wait();
}

async function deployUSDT() {
  const provider = ethers.getDefaultProvider('http://127.0.0.1:8652');
  const wallet = new ethers.Wallet(accounts.account1.privKey, provider);
  const factory = new ethers.ContractFactory(usdt.abi, usdt.bytecode, wallet);
  const contract = await factory.deploy();
  console.log(contract.address);
  await contract.deployTransaction.wait();
}

async function main() {
  // await deployKNC();
  await deployUSDT();
  // deploySth();
}

main().catch(console.log);

