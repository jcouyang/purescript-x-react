import React from 'react';
import logo from './logo.svg';
import './App.css';
import {action, mkChannel, subChannel} from './actions/App'
import {send, subscribe, channel} from './actions/Signal.Channel'
import {unsafePerformEffect} from './actions/Effect.Unsafe'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {click: 0}
    this.channel = unsafePerformEffect(channel(a=>a))
    }

  componentDidMount(){
    const setState = this.setState.bind(this)
    unsafePerformEffect(subChannel(this.channel)(setState))
  }
  doSomething(){
   return unsafePerformEffect(send(this.channel)(action))
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button onClick={() => this.doSomething()}>+</button>
          <i>{this.state.click}</i>
        </header>
      </div>
    ); 
  }
}

export default App;
