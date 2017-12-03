import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Input from './../common/Input';
import { register } from './../../api/remote';

class RegisterPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
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
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                error: {
                    message: 'Check the form for errors',
                    errors: { confirmPassword: "Passwords don't match" }
                }
            });
            return;
        }
        const res = await register(this.state.name, this.state.email, this.state.password);
        if(!res.success){
            this.setState({error: res});
            return;
        }
        this.props.history.push('/login');
    }

    render(){
        let errors = null;
        if (this.state.error) {
            errors = (
                <div>
                    <h2 style={{color: "red"}}>{this.state.error.message}</h2>
                    {Object.keys(this.state.error.errors).map(k => {
                        return <p key={k}>{this.state.error.errors[k]}</p>;
                    })}
                </div>
            );
        }

        return(
            <div className="container">
                <h3>Register Form</h3>
                {errors}
                <form onSubmit={this.onSubmitHandler}>
                    <Input 
                    name="name"
                    type="text" 
                    value={this.state.name}
                    onChange={this.onChangeHandler}
                    label="Name"/>
                    <Input 
                    name="email"
                    type="email" 
                    value={this.state.email}
                    onChange={this.onChangeHandler}
                    label="Email"/>
                    <Input 
                    name="password"
                    type="password" 
                    value={this.state.password}
                    onChange={this.onChangeHandler}
                    label="Password"/>
                    <Input 
                    name="confirmPassword"
                    type="password" 
                    value={this.state.confirmPassword}
                    onChange={this.onChangeHandler}
                    label="Confirm Password"/>
                    <input type="submit" value="Register"/>
                </form>
            </div>
        );
    }
}

export default withRouter(RegisterPage);