require("@nomicfoundation/hardhat-toolbox");
const accounts = require('./data/accounts/accounts.json');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.5.16",
  networks: {
    privnet: {
      url: 'http://127.0.0.1:8652',
      accounts: [
        accounts.account9.privKey
      ]
    }
  }
};
