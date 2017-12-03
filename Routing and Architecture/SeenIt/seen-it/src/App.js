import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer';
import Home from './components/auth/Home';
import LoggedInWrapper from './components/appElements/LoggedInWrapper';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      token: '',
      username: ''
    };
  }

  logout(){
    fetch('https://baas.kinvey.com/user/kid_SyCvPsEyG/_logout', {
      method: 'POST',
      headers: {
        'Authorization': 'Kinvey ' + this.state.token
      }
    })
      .then(() => {
        localStorage.clear();
        window.location.replace('/');
      });
  }

  componentDidMount(){
    if(localStorage.getItem('token')){
      this.setState({ token: localStorage.getItem('token') });
      this.setState({ username: localStorage.getItem('username') });    
    }
  }

  render() {
    return (
    <BrowserRouter>
      <div id="container">
      { 
        (this.state.token !== '' && this.state.token !== 'undefined' && typeof(localStorage.token) !== 'undefined') ? <Header username={this.state.username} logout={this.logout.bind(this)} /> : <div>
        <span className="logo">☃</span><span className="header">SeenIt</span>
        </div>
    }
        <div className="content">
          {this.state.token === '' ? <Home /> : <LoggedInWrapper />}
        </div>
        <Footer />
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
