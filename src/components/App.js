import React, { Component } from 'react';
// import logo from '../logo-eth.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="https://thelightideas.co.ke/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Light Ideas
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="https://thelightideas.co.ke/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* <img src={logo} className="App-logo" alt="logo" /> */}
                </a>
                <h1>Light Ideas Starter Kit</h1>
                <p>
                  Edit <code>src/components/App.js</code> and save to reload.
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
