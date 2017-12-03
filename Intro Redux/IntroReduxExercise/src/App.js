import React, { Component } from 'react';
import './App.css';
import CounterWrapper from './components/Counter/CounterWrapper';
import InputWrapper from './components/Input/InputWrapper';

class App extends Component {
  constructor(props){
    super(props);

    this.state = '';
  }

  render() {
    return (
      <div className="App">
        <CounterWrapper />
        <br /><br / ><br /><br / >
        <InputWrapper />
      </div>
    );
  }
}

export default App;

