import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';

class Register extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      confirm: '',
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    console.log(state);
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username, email, password } = this.state;

    axios.post('/api/auth/register', { username, email, password })
      .then((result) => {
        this.props.history.push("/login")
      });
  }

  render() {
    const { username, email, password, confirm } = this.state;
    return (
      <div class="container">
        <form class="form-signin" onSubmit={this.onSubmit}>
          <h2 class="form-signin-heading">Register</h2>
          <label for="inputUser" class="sr-only">Username</label>
          <input type="text" class="form-control" placeholder="Username" name="username" value={username} onChange={this.onChange} required/>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" class="form-control" placeholder="Email address" name="email" value={email} onChange={this.onChange} required/>
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" class="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required/>
          <label for="inputConfirm" class="sr-only">Confirm Password</label>
          <input type="password" class="form-control" placeholder="Confirm Password" name="confirm" value={confirm} onChange={this.onChange} required/>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Register;