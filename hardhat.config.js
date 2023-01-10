require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    goerli:{
      url:"https://goerli.infura.io/v3/0db229bf66eb42b18886775556227298",
      accounts:[process.env.privateKey]
    }
  }
};
