import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';
import Input from './../common/Input.jsx';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
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

    const { username, password } = this.state;

    axios.post('/api/auth/login', { username, password })
      .then((result) => {
        localStorage.setItem('jwtToken', result.data.token);
        localStorage.setItem('name', result.data.name);
        localStorage.setItem('email', result.data.email);
        localStorage.setItem('role', result.data.role);
        
        toastr.success('Login successful!');   
        this.setState({ message: '' });
        this.props.history.push('/')
      })
      .catch((error) => {
        if(error.response.status === 401) {
          toastr.error('Login failed!Check the form for errors!');
          this.setState({ message: error.response.data.message });
        }
      });
  }

  render() {
    const { username, password, message } = this.state;
    return (
      <div className="container">
        <form className="form-signin" onSubmit={this.onSubmit}>
          {message !== '' &&
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>Error</strong> {message}
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          }
          <h2 className="form-signin-heading">Please Sign In</h2>
          <Input
            name="username"
            type="text"
            value={username}
            placeholder="Username"
            onChange={this.onChange}
            label="Username" />
          <Input
            name="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={this.onChange}
            label="Password" />
          <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
          <p>
            Not a member? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;