import React, { Component } from 'react';

import './App.css';

import Slider from './components/Slider';
import Roster from './components/Roster';
import Bio from './components/Bio';

import observerMenu from './utils/observer';

class App extends Component {
  constructor(props){
    super(props);

    this.state= {
      focusedChar: 0
    };

    this.eventHandler = (newState) => {
      this.setState({ focusedChar:newState });
    };
  }

  componentDidMount(){
    observerMenu.addObserver('changeFocus', this.eventHandler);
  }

  render() {
    // console.log(this.state.focusedChar);
    return (
      <div className="App">
        <Slider />
        <Roster />
        <Bio charId={+this.state.focusedChar} />
      </div>
    );
  }
}

export default App;
