import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Catalog.css';

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
            <div class="panel">
              <div>
                {/* https://drive.google.com/file/d/1GXHsmI8OnoI1NzBmPydOD5ffiCBnW8HD/view?usp=sharing" 
                    https://drive.google.com/thumbnail?id=1GXHsmI8OnoI1NzBmPydOD5ffiCBnW8HD*/}
                <h2 class="page-title">
                  Book Catalog
                </h2>
              </div>
              <div class="album py-5 bg-light">
                <div class="container">
                  <div class="row">
                  {this.state.books.map(book =>
                    <div class="col-md-3">
                      <div class="card mb-4 box-shadow">
                        <Link to={`/show/${book._id}`}>
                          <img class="card-img-top" src={book.imageURL} alt="book" data-holder-rendered="true"/>
                        </Link>
                          <div class="card-body">
                            <h5 class="card-title text-muted"><u>{book.title}</u></h5>
                            <p class="card-text">{book.shortDescription}</p>
                            <p class="text-success mb-3 mt-3">{book.price}$</p>
                            {/* <div class="d-flex justify-content-between align-items-center"> */}
                              {/* <div class="btn-group"> */}
                                <Link to={`/show/${book._id}`} type="button" class="btn btn-sm btn-secondary mr-2">View More</Link>
                                <button type="button" class="btn btn-sm btn-secondary">Add to Card</button>
                              {/* </div> */}
                            {/* </div> */}
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