import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {withRouter} from 'react-router';
import Search from './../common/Search';
import './Catalog.css';

class Catalog extends Component {
  constructor(props){
    super(props);
      this.state= {
        books: [],
        selectedBook: {},
        isAdded: false
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

      render() {
        return (
          <div class="container">
            <div class="panel">
              <div className="row">
                <div className="col-md-4">
                  <h2 class="page-title">Book Catalog</h2>
                </div>
                <div className="col-md-4 offset-md-4">
                <Search />
                </div>
              </div>
              <div class="album py-5">
                <div class="row">
                  {this.state.books.map(book =>
                    <div class="col-md-3" key={book._id}>
                      <div class="card mb-3 bg-light">
                        <Link to={`/book/${book._id}`}>
                          <img class="card-img-top" src={book.imageURL} alt="book" data-holder-rendered="true"/>
                        </Link>
                          <div class="card-body">
                            <Link to={`/book/${book._id}`}>
                              <h5 class="card-title text-muted"><u>{book.title}</u></h5>
                            </Link>
                            <p class="card-text">{book.shortDescription}</p>
                            <p className="price">
                            {new Intl.NumberFormat('de-DE', { 
                                style: 'currency', 
                                currency: 'USD' 
                            }).format(book.price)}
                            </p>
                            <Link to={`/book/${book._id}`} type="button" class="btn btn-sm btn-secondary mr-2">View More</Link>
                            <button type="button" className="btn btn-sm btn-secondary" 
                            onClick={this.addToCart.bind(this, book.imageURL, book.title, book.price, book._id)}>
                            Add to Cart
                            </button>
                          </div>
                      </div>
                    </div>
                    )}
                  </div>
              </div>
            </div>
          </div>
        );
      }
}

export default withRouter(Catalog);