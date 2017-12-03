import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Input from './../common/Input';
import { login } from './../../api/remote';

class LoginPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            error: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e){
        e.preventDefault();
        const res = await login(this.state.email, this.state.password);
        if (!res.success) {
            this.setState({error: res});
            console.log(this.state.error)
            return;
        }
        localStorage.setItem('token', res.token);  
        localStorage.setItem('user', res.user.name);                      
        this.props.history.push('/');
    }

    render(){
        let errors = null;
        if (this.state.error) {
            errors = (
                <div>
                    <h2 style={{color: 'red'}}>{this.state.error.message}</h2>
                    {Object.keys(this.state.error.errors).map(k => {
                        return <p key={k}>{this.state.error.errors[k]}</p>;
                    })}
                </div>
            );
        }
        return(
            <div className="container">
                <h3>Login Form</h3>
                {errors}
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChangeHandler}
                    label="Email" />
                    <Input
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChangeHandler}
                    label="Password" />
                    <input type="submit" value="LogIn"/>
                </form>
            </div>
        );
    }
}

export default withRouter(LoginPage);