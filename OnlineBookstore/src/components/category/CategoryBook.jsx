import React, { Component } from 'react';
import axios from 'axios';
import BooksComponent from './../books/catalog/BooksComponent';
import './../books/catalog/Catalog.css';

export default class CategoryBook extends Component {
    constructor(props){
        super(props);
        this.state= {
            books: [],
            buttonCart: false
        };
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/api/book/category/' + this.props.match.params.name)
          .then(res => {
            this.setState({ books: res.data });
          })
          .catch((error) => {
            if(error.response.status === 401) {
              this.props.history.push("/catalog");
            }
          });
      }

      render() {
        return (
          <div class="container">
            <div class="panel">
              <div>
                <h2 class="page-title">
                  Books in Category {this.props.match.params.name}
                </h2>
              </div>
              <div class="album py-5">
                <div class="container">
                  <div class="row">
                  <BooksComponent books={this.state.books} buttonCart={this.state.buttonCart}/>
                </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
}