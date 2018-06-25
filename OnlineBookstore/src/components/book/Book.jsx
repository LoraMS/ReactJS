import React, { Component } from 'react';
import './Book.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Book extends Component {

  constructor(props) {
    super(props);
    this.state = {
      book: {}
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/api/book/'+this.props.match.params.id)
      .then(res => {
        this.setState({ book: res.data });
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  delete(id){
    axios.delete('/api/book/'+id)
      .then((result) => {
        this.props.history.push("/catalog")
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel">
          <div class="container">
              <div class="row">
                <div class="col-md-4">
                  <img class="mb-3 show-img" src={this.state.book.imageURL} alt="book" />
                </div>
                <div class="col-md-8">
                    <h5><u>{this.state.book.title}</u></h5>
                    <p>{this.state.book.author}</p>
                    <p>{this.state.book.shortDescription}</p>
                    <p className="price-show pb-3 mb-3 mt-3 border-bottom">
                            {new Intl.NumberFormat('de-DE', { 
                                style: 'currency', 
                                currency: 'USD' 
                            }).format(this.state.book.price)}
                      <button type="button" class="btn btn-sm btn-secondary ml-3">Add to Card</button>
                    </p>
                    <div>
                      <h5><u>Description</u></h5>
                      <p>{this.state.book.description}</p>
                    </div>
                </div>
              </div>
            </div>
            <div class="details-content bg-light mb-3 p-3 border">
              <h5><u>Details</u></h5>
              <p><strong>Category: </strong>{this.state.book.category}</p>
              <p><strong>Tags: </strong>React, Web Development</p>
              <p><strong>Publisher: </strong>{this.state.book.publisher}</p>
              <p><strong>Year of publishing: </strong>{this.state.book.publishedYear}</p>
              <p><strong>Product ID: </strong>{this.state.book.isbn}</p>
              <div class="mt-3">
                  <Link to={`/edit/${this.state.book._id}`} class="btn btn-sm btn-secondary">Edit</Link>&nbsp;
                <button onClick={this.delete.bind(this, this.state.book._id)} class="btn btn-sm btn-secondary mr-1">Delete</button>
                <button type="button" class="btn btn-sm btn-secondary mr-1">Add to Card</button>
                <button type="button" class="btn btn-sm btn-secondary">Add to Wish List</button>
                  </div>
            </div>
            <div class="reviews-content bg-light p-3 border">
              <h5><u>Reviews</u></h5>
              <div>Lorem ipsum</div>
            </div>
      </div>
    </div>
    );
  }
}

export default Book;