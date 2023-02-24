const hre = require("hardhat");
const accounts = require('../data/accounts/accounts.json');
const ethers = require('ethers');
const abi = require('./erc20.json')

async function main() {
  // uni v2 factory
  // 0x55E4eF6eF2B9Cf9594D1498FDfBDaC5879EFF375

  // knc
  // 

  const provider = ethers.getDefaultProvider('http://127.0.0.1:8652')

  const code = await provider.getBalance(accounts.account9.address);
  console.log(code.toString());

  // const contract = new ethers.Contract('0x6C01E2647862a1eB10123f5b9af2fc233882cE49', abi, provider);
  // const a = await contract.symbol();
  // console.log(a.toString());


  // const txData = await provider.getTransaction('0xde316eb1bb598097b67d95466d63fe4d8e12c7df4f6383cd466ca3a85e111e45');
  // console.log(txData);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
