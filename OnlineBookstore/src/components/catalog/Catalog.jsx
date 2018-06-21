import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Catalog extends Component {
    constructor(props){
        super(props);
        this.state= {
            books: []
        };
    }

    componentDidMount() {
        // axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/api/book')
          .then(res => {
            this.setState({ books: res.data });
            console.log(this.state.books);
          })
          .catch((error) => {
            if(error.response.status === 401) {
              this.props.history.push("/login");
            }
          });
      }

      render() {
        return (
          <div class="container">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">
                  BOOK CATALOG
                </h3>
                <div class="text-right">
                </div>
              </div>
              <div class="panel-body">
               {/* {localStorage.getItem('jwtToken') && <h4><Link to="/create">Add Book</Link></h4>}  */}
                <div class="container">
                  <div class="row">
                  {this.state.books.map(book =>
                    <div class="col-md-3">
                      <div class="card mb-3">
                        <Link to={`/show/${book._id}`}>
                          <img class="card-img-top" src={book.imageURL} alt="book" />
                        </Link>
                          <div class="card-body">
                            <h5 class="card-title">{book.title}</h5>
                            <p class="card-text">{book.shortDescription}</p>
                            <p class="text-danger mb-3 mt-3">{book.price}$</p>
                            <Link to={`/show/${book._id}`}>Read More</Link>
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