import React, { Component } from 'react';

export default class Input extends Component {
    render(){
        const { name, type, value, onChange, label, placeholder } = this.props;
        return(
            <div>
                <label className="sr-only" htmlFor={name}>{label}</label>
                <input className="form-control" required
                id={name}
                type={type} 
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}/>
            </div>
        );
    }
}