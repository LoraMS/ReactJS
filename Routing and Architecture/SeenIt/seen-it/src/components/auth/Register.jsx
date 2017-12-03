import React, { Component } from 'react';

import requestHandler from './../../utils/requestHandler';

class Register extends Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '', 
            repeatPass: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();
        requestHandler.register(this.state);
    }

    render(){
        return(
            <form id="registerForm" onSubmit={this.onSubmit}>
                <h2>Register</h2>
                <label>Username:</label>
                <input name="username" type="text" onChange={this.onChange} />
                <label>Password:</label>
                <input name="password" type="password" onChange={this.onChange} />
                <label>Repeat Password:</label>
                <input name="repeatPass" type="password" onChange={this.onChange} />
                <input id="btnRegister" value="Sign Up" type="submit" />
            </form>
        );
    }
}

export default Register;