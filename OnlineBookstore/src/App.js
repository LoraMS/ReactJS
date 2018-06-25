import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Home from './components/home/HomePage';
import Catalog from './components/catalog/Catalog';
import Edit from './components/edit/Edit';
import Create from './components/create/Create';
import Book from './components/book/Book';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import About from './components/about/About';
import Profile from './components/user/Profile';
import CreateEvent from './components/create_event/CreateEvent';
import Events from './components/events/Events';
import Event from './components/event/Event';
import EditEvent from './components/edit_event/EditEvent';

class App extends Component {
  constructor(props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    localStorage.removeItem('jwtToken');
    // window.location.reload();
    window.location.replace('/');
  } 

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
  }

  render() {
    return (
      <div className="App">
        <Header loggedIn={ localStorage.getItem('jwtToken') !== null } onLogout={ this.onLogout }/>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/catalog' component={Catalog} />
          <Route path='/edit/:id' component={Edit} />
          <Route path='/create' component={Create} />
          <Route path='/book/:id' component={Book} />
          <Route path='/events' component={Events} />
          <Route path='/add' component={CreateEvent} />
          <Route path='/editev/:id' component={EditEvent} />
          <Route path='/event/:id' component={Event} />
          <Route path='/about' component={About} />
          <Route path='/profile' component={Profile} />
        </Switch>
        <Footer />
        </div>
    );
  }
}

export default App;

/*
1.from package.json/scripts was removed
// "start": "node ./bin/www" to use with npm run build
//now "react-scripts-start"

2.then added
"proxy": "http://localhost:3000",

3.then uncommented row 8 and row 64 from app.js

to start terminal 1 : nodemon app.js
to start terminal 2 : npm start
*/