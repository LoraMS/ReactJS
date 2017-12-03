import React, { Component } from 'react';

export default class Counter extends Component{
    constructor(props){
        super(props);

        this.state = '';
    }

    render(){
        // console.log(this.props); // {props: {index: 0, value: 0}, func: {addCounter: ƒ, removeCounter: ƒ, increment: ƒ, decrement: ƒ, clear: ƒ}}
        return (
            <div>
                <h1>{this.props.props.value}</h1>
                <br/>
                <button onClick={() => {
                    return this.props.func.increment({ index: this.props.props.index, step: 5 });
                }}>INCREMENT</button>
                <button onClick={() => {
                    return this.props.func.decrement({ index: this.props.props.index, step: 5 });
                }}>DECREMENT</button>
                <button onClick={() => {
                    return this.props.func.clear({ index: this.props.props.index });
                }}>CLEAR</button>
            </div>
        );
    }
}