import React, { Component } from 'react';
import Input from './Input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from './../../actions/inputActions';

class InputWrapper extends Component{
    constructor(props){
        super(props);

        this.state = {
            input: ''
        };

        this.onChange = this.onChange.bind(this);       
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    render(){
        // console.log(this.props); // {actions:{add: ƒ, delete: ƒ, save: ƒ}, appState: counter: Array(0), input: [{0: {index: 0, value: 0}}]}}

        const btnStyle = {
            color: 'red',
            padding: '5px',
            marginLeft: '165px'
          };

        return(
            <div>
                <div>
                    <input 
                    type="text" 
                    name="input" 
                    value={this.state.input} 
                    onChange={this.onChange} />
                    <button 
                    style={{ color: 'green' }} 
                    onClick={() => {
                        this.props.actions.add(this.state.input);
                    }}>Add Input</button>
                </div>
                <br/>
                <div>
                    {this.props.appState.input.map(input => {
                        return <Input key={input.index} props={input} func={this.props.actions} />;
                    })}
                </div>
                <br/>
                <div>
                    <button style={btnStyle} onClick={() => { this.props.actions.delete(); }}>Delete Last</button>
                </div>
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
    };
  }
  
  export default connect(mapStateProps, mapDispatchToProps)(InputWrapper);