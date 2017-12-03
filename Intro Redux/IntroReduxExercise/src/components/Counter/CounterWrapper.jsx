import React, { Component } from 'react';
import Counter from'./Counter';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from './../../actions/counterActions';

export class CounterWrapper extends Component{
    constructor(props){
        super(props);

        this.state = '';
    }

    render(){
        // console.log(this.props); // {appState: {counter: [{0: {index: 0, value: 0}}]}, actions: {addCounter: f, removeCounter: f, clear: f, decrement: f, increment: f}}
        return (
            <div>
                {this.props.appState.counter.map(counter => {
                    return <Counter key={counter.index} props={counter} func={this.props.actions} />
                })}
                <br/>
                <button onClick={() => {
                    // this.props.add();
                    this.props.actions.addCounter();
                }}>ADD</button>
                <button onClick={() => {
                    // this.props.remove();
                    this.props.actions.removeCounter();
                }}>REMOVE</button>
            </div>
        );
    }
}

function mapStateProps(state){
  return {
    appState: state
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(actions, dispatch)
    // add: () => dispatch(actions.addCounter()),
    // remove: () => dispatch(actions.removeCounter()),
    // increment: (value) => dispatch(actions.increment(value)),
    // decrement: (value) => dispatch(actions.decrement(value)),
    // clear: (value) => dispatch(actions.clear(value))    
  };
}

export default connect(mapStateProps, mapDispatchToProps)(CounterWrapper);
    

