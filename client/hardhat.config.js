
require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY="7fd22d5f5ffab0365bd07fc026a87f923713ac87b1e8afa3ee1c9e4d6454ad5f";
const RPC_URL="https://rpc.ankr.com/polygon_mumbai";

module.exports = {
  
  defaultNetwork:"polygon_mumbai",

  networks: {
    hardhat:{
       chainID:80001,
    },
    polygon_mumbai:{
       url:RPC_URL,
       accounts:[`0x${PRIVATE_KEY}`],
    },     
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};