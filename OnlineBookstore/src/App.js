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
import CategoryBook from './components/category/CategoryBook';
import CategoryEvent from './components/category/CategoryEvent';
import UserList from './components/user/UserList';
import PageNotFound from './components/common/PageNotFound';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
			books: [],
			cart: [],
			totalItems: 0,
			totalAmount: 0, 
    };
    
		this.handleAddToCart = this.handleAddToCart.bind(this);
		this.sumTotalItems = this.sumTotalItems.bind(this);
		this.sumTotalAmount = this.sumTotalAmount.bind(this);
		this.checkBook = this.checkBook.bind(this);
    this.handleRemoveBook = this.handleRemoveBook.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);

    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    this.getBooks();
  }

  getBooks(){
    axios.get('/api/book')
      .then(res => {
          this.setState({ books: res.data });
      });
  }

  // Add to Cart
  handleAddToCart(selectedBook){
    let cartItem = this.state.cart;
    let bookId = selectedBook.id;
    if(this.checkBook(bookId) > -1){
      this.setState({
        cart: cartItem
      })
    } else {
      cartItem.push(selectedBook);
    }

    this.setState({
      cart : cartItem,
        });
     
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
  }
  
  // not finished
  handleRemoveBook(id, e){
    let cart = this.state.cart;
    let index = cart.findIndex((b => b.id === id));
    cart.splice(index, 1);
      this.setState({
        cart: cart
      })
      this.sumTotalItems(this.state.cart);
      this.sumTotalAmount(this.state.cart);
      e.preventDefault();
  }

  handleCheckout(){
    this.setState({
        cart: [],
        totalAmount: 0,
        totalItems: 0
      });
  }
      
  checkBook(bookId){
    const cart = this.state.cart;
      return cart.findIndex(item => item.id === bookId); 
  }
    
  sumTotalItems(){
    let total = 0;
    let cart = this.state.cart;
    total = cart.length;
    this.setState({
      totalItems: total
    })
  }
    
  sumTotalAmount(){
    let total = 0;
    let cart = this.state.cart;
    for (let i=0; i<cart.length; i++) {
      total += cart[i].price;
    }
    this.setState({
      totalAmount: total
    })
  }

  onLogout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    window.location.replace('/');
  } 

  render() {
    return (
      <div className="App">
        <Header 
        loggedIn={ localStorage.getItem('jwtToken') !== null } 
        total={this.state.totalAmount}
        totalItems={this.state.totalItems}
        cartItems={this.state.cart}
        removeBook={this.handleRemoveBook}
        checkout={this.handleCheckout}
        onLogout={ this.onLogout } 
        />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/category/:name' component={CategoryBook} />
          <Route path='/evcategory/:name' component={CategoryEvent} />
          <Route path='/catalog' render={()=><Catalog addToCart={this.handleAddToCart}/>} />
          <Route path='/edit/:id' component={Edit} />
          <Route path='/create' component={Create} />
          <Route path='/book/:id' render={()=><Book addToCart={this.handleAddToCart}/>} />
          <Route path='/events' component={Events} />
          <Route path='/add' component={CreateEvent} />
          <Route path='/editev/:id' component={EditEvent} />
          <Route path='/event/:id' component={Event} />
          <Route path='/about' component={About} />
          <Route path='/profile' component={Profile} />
          <Route path='/list' component={UserList} />
          <Route path="*" component={PageNotFound}/>
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
//now "react-scripts start"

2.then added
"proxy": "http://localhost:3001",

3.then uncommented row 8 and row 64 from app.js

to start terminal 1 : nodemon app.js
to start terminal 2 : npm start
*/