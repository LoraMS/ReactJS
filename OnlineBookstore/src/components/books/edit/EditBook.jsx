import React, { Component } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import { Link } from 'react-router-dom';
import Input from './../../common/Input';
import './EditBook.css';

class EditBook extends Component {

  constructor(props) {
    super(props);
    this.state = {
      book: {},
      message: '',
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/api/book/'+this.props.match.params.id)
      .then(res => {
        this.setState({ book: res.data });
      });
  }

  onChange = (e) => {
    const state = this.state.book
    state[e.target.name] = e.target.value;
    this.setState({book:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { isbn, title, author, shortDescription, description, publishedYear, publisher, imageURL, price, category } = this.state.book;

    axios.put('/api/book/'+this.props.match.params.id, { isbn, title, author, shortDescription, description, publishedYear, publisher, imageURL, price, category })
      .then((result) => {
        toastr.success('Book edit successfully!');
        this.props.history.push("/book/"+this.props.match.params.id)
      })
      .catch((error) => {
        if(error.response.status === 401) {
          toastr.error('Edit failed. Check the form for errors.');
          this.setState({ message: error.response.data.message });
        }
      });
  }

  render() {
    return (
      <div className="container">
        <div className="panel">
            <h2 className="edit-title">
              Edit Book
            </h2>
            <form onSubmit={this.onSubmit.bind(this)}>
            {this.state.message !== '' &&
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>Error</strong> {this.state.message}
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          }
              <div className="form-group">
                <Input
                  name="isbn"
                  type="text"
                  value={this.state.book.isbn}
                  placeholder=" ISBN"
                  onChange={this.onChange.bind(this)}
                  label="ISBN" />
              </div>
              <div className="form-group">
                <Input
                  name="title"
                  type="text"
                  value={this.state.book.title}
                  placeholder=" Title"
                  onChange={this.onChange.bind(this)}
                  label="Title" />
              </div>
              <div className="form-group">
                <Input
                  name="author"
                  type="text"
                  value={this.state.book.author}
                  placeholder=" Author"
                  onChange={this.onChange.bind(this)}
                  label="Author" />
              </div>
              <div className="form-group">
                <label for="short_description" className="sr-only">Short Description:</label>
                <textArea className="form-control" name="shortDescription" onChange={this.onChange.bind(this)} placeholder="Short Description" cols="80" rows="2">{this.state.book.shortDescription}</textArea>
              </div>
              <div className="form-group">
                <label for="description" className="sr-only">Description:</label>
                <textArea className="form-control" name="description" onChange={this.onChange.bind(this)} placeholder="Description" cols="80" rows="3">{this.state.book.description}</textArea>
              </div>
              <div className="form-group">
                <Input
                  name="publishedYear"
                  type="number"
                  value={this.state.book.publishedYear}
                  placeholder=" Published Year"
                  onChange={this.onChange.bind(this)}
                  label="Published Date" />
              </div>
              <div className="form-group">
                <Input
                  name="publisher"
                  type="text"
                  value={this.state.book.publisher}
                  placeholder=" Publisher"
                  onChange={this.onChange.bind(this)}
                  label="Publisher" />
              </div>
              <div className="form-group">
                <Input
                  name="category"
                  type="text"
                  value={this.state.book.category}
                  placeholder=" Category"
                  onChange={this.onChange.bind(this)}
                  label="Category" />
              </div>
              <div className="form-group">
                <Input
                  name="price"
                  type="number"
                  value={this.state.book.price}
                  placeholder=" Price"
                  onChange={this.onChange.bind(this)}
                  label="Price" />
              </div>
              <div className="form-group">
                  <Input
                  name="imageURL"
                  type="text"
                  value={this.state.book.imageURL}
                  placeholder=" Image URL"
                  onChange={this.onChange.bind(this)}
                  label="Image" />
                <img src={this.state.book.imageURL} alt="img" />
              </div>
              <Link to={`/book/${this.state.book._id}`} className="btn btn-secondary mr-3">Back to Book</Link>
              <button type="submit" className="btn btn-secondary">Edit Book</button>
            </form>
        </div>
      </div>
    );
  }
}

export default EditBook;