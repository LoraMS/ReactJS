import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router';
import AddComment from './../../comments/add_comment/AddComment';
import Comment from './../../comments/comment/Comment';
import './Book.css';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      selectedBook: {},
      add: '',
      isAdded: false
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    const name = localStorage.getItem('name');
    axios.get('/api/book/'+this.props.match.params.id)
      .then(res => {
        this.setState({ book: res.data });
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.props.history.push("/login");
        }
      });

      axios.get('/api/auth/all/' + name)
        .then(res => {
          const currentUser = res.data;
          const index = currentUser.bookList.findIndex(b=> b.bookId === this.props.match.params.id);
          if(index > -1){
            this.setState({ add: false });
          } else {
          this.setState({ add: true });
          }
        });
  }

  delete(id){
    axios.delete('/api/book/'+id)
      .then((result) => {
        this.props.history.push("/catalog")
      });
  }

  bookAction(bookId, title){
    const name = localStorage.getItem('name');
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    if (!this.state.add) {
      axios.put('/api/auth/remove', {bookId, name})
      .then((result) => {
        this.setState({
          add: true
        });
      })
      .catch((error) => {
             if(error.response.status === 401) {
             this.props.history.push("/login");
            }
      });
    } else {
      axios.put('/api/auth/add', {bookId, title, name})
      .then((result) => {
        this.setState({
          add: false
        });
      })
      .catch((error) => {
             if(error.response.status === 401) {
             this.props.history.push("/login");
            }
      });
    }
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
    const rArray = this.state.book.reviews || [];
    const label = this.state.add ?  'Add to' : 'Remove from';
    const role = localStorage.getItem('role');

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
                      <button type="button" className={!this.state.isAdded ? "btn btn-sm btn-secondary ml-3" : "btn btn-sm btn-secondary ml-3 added"} onClick={this.addToCart.bind(this, this.state.book.imageURL, this.state.book.title, this.state.book.price, this.state.book._id)}>{!this.state.isAdded ? "Add to Cart" : "✔ Added"}</button>
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
              <p><strong>Category: </strong><Link to={`/category/${this.state.book.category}`} className="category">{this.state.book.category}</Link></p>
              <p><strong>Tags: </strong>React, Web Development</p>
              <p><strong>Publisher: </strong>{this.state.book.publisher}</p>
              <p><strong>Year of publishing: </strong>{this.state.book.publishedYear}</p>
              <p><strong>Product ID: </strong>{this.state.book.isbn}</p>
              <div class="mt-3">
                {role === 'admin' && <Link to={`/edit/${this.state.book._id}`} class="btn btn-sm btn-secondary mr-1">Edit</Link>}
                {role === 'admin' && <button onClick={this.delete.bind(this, this.state.book._id)} class="btn btn-sm btn-secondary mr-1">Delete</button>}
                <button type="button" className={!this.state.isAdded ? "btn btn-sm btn-secondary mr-1" : "btn btn-sm btn-secondary mr-1 added"} onClick={this.addToCart.bind(this, this.state.book.imageURL, this.state.book.title, this.state.book.price, this.state.book._id)}>{!this.state.isAdded ? "Add to Cart" : "✔ Added"}</button>
                <button onClick={this.bookAction.bind(this, this.state.book._id, this.state.book.title)} type="button" className="btn btn-sm btn-secondary">{label} Book List</button>
                  </div>
            </div>
            <div class="reviews-form bg-light p-3 mb-3 border">
              <h5><u>Add Review</u></h5>
              <div className="review-add">
                <AddComment id={this.props.match.params.id}/>
              </div>
            </div>
            <div class="reviews-content bg-light p-3 mb-3 border">
              <h5 className="mb-3"><u>Reviews</u></h5>
              {rArray.length === 0 && <div>This book has no reviews yet.</div> }
              {rArray.length > 0 && rArray.map((review) => {
                 return <Comment key={review._id} props={review}/>;
              })}
            </div> 
      </div>
    </div>
    );
  }
}

export default withRouter(Book);