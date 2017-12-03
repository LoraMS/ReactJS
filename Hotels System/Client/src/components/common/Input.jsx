import React, { Component } from 'react';

export default class Input extends Component {
    render(){
        const { name, type, value, onChange, label } = this.props;
        return(
            <div>
                <label htmlFor={name}>{label}</label>
                <input 
                id={name}
                type={type} 
                name={name}
                value={value}
                onChange={onChange}/>
            </div>
        );
    }
}