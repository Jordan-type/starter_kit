require('babel-register');
require('babel-polyfill');
require('dotenv').config();

const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
const privateKeys = process.env.PRIVATE_KEYS || ""

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",  // Localhost (default: none)
      port: 7545,         // Standard Ethereum port (default: none)
      network_id: "*"     // Any network (default: none)
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(
          privateKeys.split(','),  //  private key
          `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}` //  url to an ethereum node
        )
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 42
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "petersburg"
    }
  }
}


