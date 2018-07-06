import React, { Component } from 'react';
import axios from 'axios';
import Input from './../common/Input.jsx';
import './Login.css';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      confirm: '',
      message: '',
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username, email, password } = this.state;

    if (password !== this.state.confirm) {
      this.setState({ message: 'Register failed.Passwords do not match'});
      return;
    }

    axios.post('/api/auth/register', { username, email, password })
      .then((result) => {
        this.setState({ message: '' });
        this.props.history.push("/login")
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.setState({ message: 'Register failed. Check the form for errors' });
        }
      });
  }

  render() {
    const { username, email, password, confirm, message } = this.state;
    return (
      <div class="container">
        <form class="form-signin" onSubmit={this.onSubmit}>
        {message !== '' &&
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>Error</strong> {message}
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          }
          <h2 class="form-signin-heading">Please Register</h2>
          <Input
            name="username"
            type="text"
            value={username}
            placeholder="Username"
            onChange={this.onChange}
            label="Username" />
          <Input
            name="email"
            type="email"
            value={email}
            placeholder="Email address"
            onChange={this.onChange}
            label="Email address" />
          <Input
            name="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={this.onChange}
            label="Password" />
          <Input
            name="confirm"
            type="password"
            value={confirm}
            placeholder="Confirm Password"
            onChange={this.onChange}
            label="Confirm Password" />
          <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Register;