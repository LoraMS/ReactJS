import React, { Component } from 'react';

// import validationFunc from './../../utils/formValidator';
import Input from './formFields/Input';

class LogInForm extends Component {
    constructor() {
      super();
  
      this.state = {
        email: '',   
        password: '',
      };
    }

    submitLogIn(e){
        e.preventDefault();
        const payload = {
            email: this.state.email,
            password: this.state.password
        };

        this.loginUser(payload);
    }

    loginUser(payload){
        fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
        })
        .then(res => {
            return res.json();
        })
        .then(d => {
            // console.log(d);
            this.props.authFunc(d);
        });
    }

    render(){
        const mailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,4})$/;
        const validPassword = this.state.password !== '' && this.state.password.length > 7;
        const validEmail = this.state.email !== '' && mailRegex.test(this.state.email);
        return(
            <form onSubmit={this.submitLogIn.bind(this)}>
                <fieldset className='App'>
                    <div style={{ display: 'inline-grid' }}>
                        <h2>Log In</h2>
                        <Input 
                        type="email" 
                        name="Email" 
                        data="email" 
                        valid={validEmail} 
                        func={e => {
                            this.setState({ email: e.target.value });
                        }}/>
                        <Input 
                        type="password" 
                        name="Password" 
                        data="password" 
                        valid={validPassword} 
                        func={e => {
                            this.setState({ password: e.target.value });
                        }}/>
                        <input 
                        type="submit" 
                        value="LogIn"
                        style={({ 'display': (validPassword && validEmail) === true ? '' : 'none' })} />
                    </div>
                </fieldset>
            </form>
        );
    }
}

export default LogInForm;