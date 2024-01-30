/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY="";
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