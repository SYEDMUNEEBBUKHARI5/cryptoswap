require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/kNQjtyJJVZzfYaqIbYG0HdEZgv2BGIZu",
        blockNumber: 20354614, // Adjust this based on your testing needs
      }
    }
  }
};
