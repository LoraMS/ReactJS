import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Catalog.css';
// import ShoppingCart from './../shopping_cart/ShoppingCart';

export default class Catalog extends Component {
    constructor(props){
        super(props);
        this.state= {
            books: []
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

      render() {
        return (
          <div class="container">
            <div class="panel">
              <div>
                {/* https://drive.google.com/file/d/1GXHsmI8OnoI1NzBmPydOD5ffiCBnW8HD/view?usp=sharing" 
                    https://drive.google.com/thumbnail?id=1GXHsmI8OnoI1NzBmPydOD5ffiCBnW8HD*/}
                <h2 class="page-title">
                  Book Catalog
                </h2>
                {/* <ShoppingCart /> */}
              </div>
              <div class="album py-5">
                <div class="container">
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
                            {/* <p class="price mb-3 mt-3">{book.price}$</p> */}
                            <p className="price">
                            {new Intl.NumberFormat('de-DE', { 
                                style: 'currency', 
                                currency: 'USD' 
                            }).format(book.price)}
                            </p>
                                <Link to={`/book/${book._id}`} type="button" class="btn btn-sm btn-secondary mr-2">View More</Link>
                                <button type="button" class="btn btn-sm btn-secondary">Add to Card</button>
                          </div>
                      </div>
                    </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
}