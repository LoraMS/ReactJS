import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router';
import BooksComponent from './BooksComponent';
import Search from './../../common/Search';
import PageNotFound from './../../common/PageNotFound';
import './Catalog.css';

class Catalog extends Component {
  constructor(props){
    super(props);
      this.state= {
        books: [],
        selectedBook: {},
        isAdded: false,
        buttonCart: true,
        query: '',
        };
    }

  componentDidMount() {
    axios.get('/api/book')
      .then(res => {
        this.setState({ books: res.data });
      })
    .catch((error) => {
      if(error.response.status === 401) {
        this.props.history.push("/");
      }
    });
  }

  addToCart(image, title, price, id) {
    this.setState({
      selectedBook: {
        image: image,
        title: title,
        price: price,
        id: id,
      }
    }, function(){
        this.props.addToCart(this.state.selectedBook);
    })
    
    this.setState({
        isAdded: true
    }, function(){
        setTimeout(() => {
            this.setState({
                isAdded: false,
                selectedBook: {} 
            });
        }, 1500);
    });
  }

  handleSearch(e){
		this.setState({query: e.target.value});
  }
  
  render() {
    let filteredItems = this.state.books.filter(e => e.title.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1);
    let view;
    if (filteredItems.length > 0){
      view =  <BooksComponent books={filteredItems} addToCart={this.addToCart.bind(this)} buttonCart={this.state.buttonCart}/>
    } else if(filteredItems.length === 0){
      view =  <PageNotFound />
    } else {
      view = <BooksComponent books={this.state.books} addToCart={this.addToCart.bind(this)} buttonCart={this.state.buttonCart}/>
    }

    return (
      <div class="container">
        <div class="panel">
          <div className="row">
            <div className="col-md-4">
              <h2 class="page-title">Book Catalog</h2>
            </div>
            <div className="col-md-4 offset-md-4">
              <Search search={this.handleSearch.bind(this)}/>
            </div>
          </div>
          <div class="album py-5">
            <div class="row">
              {view}
            </div>
          </div>
        </div>
      </div>
        );
      }
}

export default withRouter(Catalog);