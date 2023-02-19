const hre = require("hardhat");
const accounts = require('../data/accounts/accounts.json');


async function main() {
  // const tx = new hr
  // const provider = new hre.ethers.getDefaultProvider('http://127.0.0.1:8652');
  // const tx = await hre.ethers.sendTransaction({
  //   to: accounts.charlie.address,
  //   from: accounts.account9.address,
  //   value: 25000
  // });

  // console.log(tx);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
