require("@nomicfoundation/hardhat-toolbox");
require("./task/balance");
require("dotenv").config();

const ETHERSCAN_API = process.env.ETHERSCAN_API || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "";

module.exports = {
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      chainId: 11155111,
      accounts: [PRIVATE_KEY],
    },
    localhost: {
      chainId: 31337,
      url: "http://127.0.0.1:8545",
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API,
  },
  gasReporter: {
    currency: "EUR",
    L1: "polygon",
    coinmarketcap: "abc123...",
  },
  solidity: "0.8.24",
};
