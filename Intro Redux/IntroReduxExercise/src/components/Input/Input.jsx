import React, { Component } from 'react';

class Input extends Component{
    constructor(props){
        super(props);

        this.state = {
            clicked: false,
            edited: '',
        };

        this.onChange = this.onChange.bind(this);       
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    render(){
        // console.log(this.state);
        // console.log(this.props); // {func:{add: ƒ, delete: ƒ, save: ƒ}, props:{index: 0, value: "something"}}
        if(!this.state.clicked){
            return(
                <div>
                    <br/>
                    <input 
                    type="text" 
                    name="input" 
                    value={this.props.props.value} 
                    onChange={this.onChange} />
                    <button 
                    style={{ color: 'green' }} 
                    onClick={() => {
                        this.setState({ 
                            clicked: true ,
                            edited: this.props.props.value
                        });
                    }}>Edit Input</button>
                </div>
            );
        } 
        return(
            <div>
                <br/>
                <input 
                type="text" 
                name="edited" 
                value={this.state.edited} 
                onChange={this.onChange} />
                <button 
                style={{ color: 'white' , backgroundColor: 'green' }}
                onClick={() => {
                    this.props.func.save({
                        index: this.props.props.index,
                        input: this.state.edited
                    });
                    this.setState({ clicked: false });
                }}>&#10004; </button>
                <button 
                style={{ color: 'white' , backgroundColor: 'red' }} 
                onClick={() => {
                    this.setState({ clicked: false });
                }}>&#10006; </button>
            </div>
        );
    }
}

export default Input;
