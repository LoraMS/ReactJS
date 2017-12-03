import React, { Component } from 'react';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import HomePage from './components/HomePage/HomePage';
import RegisterPage from './components/auth/RegisterPage';
import LoginPage from './components/auth/LoginPage';
import CreatePage from './components/Create/CreatePage';
import HotelDetails from './components/Details/HotelDetails';
import PrivateRoute from './components/common/PrivateRoute';

class App extends Component {
  constructor(props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    localStorage.clear();
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="App">
        <Header loggedIn={ localStorage.getItem('token') !== null } onLogout={ this.onLogout }/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/view/:page" component={HomePage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/create" component={CreatePage} /> 
          <PrivateRoute path="/details/:id" component={HotelDetails} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
