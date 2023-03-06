require("@nomicfoundation/hardhat-toolbox");
const accounts = require('./data/accounts/accounts.json');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.6.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    privnet: {
      url: 'http://127.0.0.1:8652',
      accounts: [
        accounts.account1.privKey
      ]
    }
  }
};
