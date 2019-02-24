import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';
import { async } from 'q';

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {manager : ''};
  // }
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: '',
  }

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    console.log(balance);

    this.setState({manager, players, balance}) //Equal to this.setState({manager:manager})
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({message: "Waiting for the transcation..."});

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({message: "You have been entered!"});
  }

  onButtonClick = async (event) => {
    const accounts = await web3.eth.getAccounts();

    this.setState({message: "Waiting for the transcation..."});
    
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });
    this.setState({message: 'A winner has been picked!'});
  }

  render() {
    // console.log(web3.version);
    // web3.eth.getAccounts().then(console.log);
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This is constract is managed by {this.state.manager}
        </p>
        <p>
          There are currently {this.state.players.length} people entered,
          competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>
        <hr/>
        <form onSubmit={this.onSubmit}>
          <h4>Try your luck?</h4>
          <div>
            <label>Enter your ether value</label>
            <input
              value = {this.state.value}
              onChange = {event => this.setState({value: event.target.value})}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr/>
        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onButtonClick}>Pick a Winner</button>
        <hr/>

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
