import React, { Component } from 'react';
import Web3 from 'web3'
import Token from '../abis/Token.json'
import EthSwap from '../abis/EthSwap.json'
import Navbar from './Navbar'
import Main from './Main'
import './App.css';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

// load the blockchain
async loadBlockchainData() {
  const web3 = window.web3
 
  // get account
  const accounts = await web3.eth.getAccounts()
  console.log("my accounts", accounts)
  this.setState({ account: accounts[0] })

  // get eth balance
  const ethBalance = await web3.eth.getBalance(this.state.account)
  console.log("my eth balance", ethBalance)
  this.setState({ ethBalance })

  // load token data
  const networkId = await web3.eth.net.getId()
  console.log("ethereum network Id:", networkId)
  const tokenData = Token.networks[networkId]
  console.log("Token Data:", tokenData)

  if(tokenData) {
    const token = new web3.eth.Contract(Token.abi, tokenData.address)
    console.log("Token Abi:", token)
    this.setState({ token })
    //get token balance
    let tokenBalance = await token.methods.balanceOf(this.state.account).call()
    this.setState({ tokenBalance: tokenBalance.toString() })
  } else {
    window.alert('Token contract not deployed to detected network.')
  }
  
  // load EthSwap data
  const ethSwapData = EthSwap.networks[networkId]
    if(ethSwapData) {
      const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
      console.log("EthSwap Abi:", ethSwapData.address)
      this.setState({ ethSwap })
    } else {
      window.alert('EthSwap contract not deployed to detected network.')
  }

  this.setState({ loading: false })
}

// load web3 to connect with metamask
   async loadWeb3() {
     if (window.ethereum) {
       window.web3 = new Web3(window.ethereum)
       await window.ethereum.enable()
     } else if (window.web3) {
       window.web3 = new Web3(window.web3.currentProvider)
     } else {
       window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
     }
   }

  //  buy tokens with eth function
  buyTokens = (etherAmount) => {
    this.setState({ loading: true })
    this.state.ethSwap.methods.buyTokens().send({ value: etherAmount, from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  //  sell tokens for eth function
  sellTokens = (tokenAmount) => {
    this.setState({ loading: true })
    this.state.token.methods.approve(this.state.ethSwap.address, tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.ethSwap.methods.sellTokens(tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }



   constructor(prop) {
     super(prop)
     this.state = {
       account: '',
       token: {},
       ethSwap: {},
       ethBalance: '0',
       tokenBalance: '0',
       loading: true
     }
   }



  render() {
    // lazy loading
    let content 
    if(this.state.loading) {
      content = <p id='loader' className="text-center">Loading...</p>
    } else {
      content = <Main
          ethBalance={this.state.ethBalance}
          tokenBalance={this.state.tokenBalance}
          buyTokens={this.buyTokens}
          sellTokens={this.sellTokens}
         />
    }
    return (
      <div>
        <Navbar account={this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="https://thelightideas.co.ke/"
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                </a>
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
