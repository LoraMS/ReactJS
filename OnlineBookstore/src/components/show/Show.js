import React, { Component } from 'react';
import './Show.css';
import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';

class Show extends Component {

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
      });;
  }

  delete(id){
    axios.delete('/api/book/'+id)
      .then((result) => {
        this.props.history.push("/")
      });
  }
  
  toggleActiveClass(){
    $(".nav .nav-link").toggleClass('active').toggleClass('show');
    $(".tab-content .tab-pane").toggleClass('active').toggleClass('show');
  }

  render() {
    return (
      <div class="container">
        <div class="panel">
          <div class="container">
              <div class="row">
                <div class="col-md-4">
                  <img class="mb-3" src={this.state.book.imageURL} alt="book" />
                  <div class="mt-3">
                  <Link to={`/edit/${this.state.book._id}`} class="btn btn-secondary">Edit</Link>&nbsp;
                <button onClick={this.delete.bind(this, this.state.book._id)} class="btn btn-secondary mr-1">Delete</button>
                <button type="button" class="btn btn-secondary">Add to Card</button>
                  </div>
                </div>
                <div class="col-md-8">
                    <h5>{this.state.book.title}</h5>
                    <p>{this.state.book.author}</p>
                    <p>{this.state.book.shortDescription}</p>
                    <p class="text-success pb-3 mb-3 mt-3 border-bottom">{this.state.book.price}$</p>
                    <p>Category: {this.state.book.category}</p>
                    <p>Tags: React, Web Development</p>
                    <p>Publisher: {this.state.book.publisher}</p>
                    <p>Year of publishing: {this.state.book.publishedYear}</p>
                    <p>Product ID: {this.state.book.isbn}</p>
                </div>
              </div>
            </div>
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" id="description" data-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true" onClick={this.toggleActiveClass}>Description</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="reviews" data-toggle="tab" href="#reviews" role="tab" aria-controls="reviews" aria-selected="false" onClick={this.toggleActiveClass}>Reviews</a>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description">{this.state.book.description}</div>
              <div class="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews">Lorem ipsum
              </div>
            </div>
      </div>
    </div>
    );
  }
}

export default Show;