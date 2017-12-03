import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';


import requestHandler from './../../utils/requestHandler';

class LogIn extends Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            // fireRedirect: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();
        requestHandler.login(this.state)
        .then((response) => {
            // console.log(response)
            localStorage.setItem('token', response._kmd.authtoken);
            localStorage.setItem('username', response.username);
            // this.setState({ fireRedirect: true });
            window.location.replace('/catalog');
        });
    }

    render(){
        // const { fireRedirect } = this.state;
        return(
            <div>
            <form id="loginForm" onSubmit={this.onSubmit}>
                <h2>Sign In</h2>
                <label>Username:</label>
                <input name="username" type="text" onChange={this.onChange} />
                <label>Password:</label>
                <input name="password" type="password" onChange={this.onChange} />
                <input id="btnLogin" value="Sign In" type="submit" />
            </form>
            
            </div>
        );
        // { fireRedirect && (
        //     <Redirect to='/catalog' />
        // )}
    }
}

export default LogIn;