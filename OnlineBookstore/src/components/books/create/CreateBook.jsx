import React, { Component } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import Input from './../../common/Input';
import './CreateBook.css';

class CreateBook extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isbn: '',
      title: '',
      author: '',
      shortDescription: '',
      description: '',
      publishedYear: '',
      publisher: '',
      imageURL: '',
      price: null,
      category: '',
      tags: null,
      reviews: null,
      message: '',
    };
  }

  fileSelectHandler = event => {
    this.setState({
      imageURL: event.target.value
    })
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { isbn, title, author, shortDescription, description, publishedYear, publisher, imageURL, price, category } = this.state;

    axios.post('/api/book', { isbn, title, author, shortDescription, description, publishedYear, publisher, imageURL, price, category})
      .then((result) => {
        toastr.success('Book added successfully!');
        this.props.history.push("/catalog");
      })
      .catch((error) => {
        if(error.response.status === 401) {
          toastr.error('Create failed. Check the form for errors.');
          this.setState({ message: error.response.data.message });
        }
      });
  }

  render() {
    const { isbn, title, author, shortDescription, description, publishedYear, publisher, imageURL, price, category, message } = this.state;
    return (
      <div className="container">
        <div className="panel">
        <h2 className="create-title">
              Add Book
            </h2>
            <form onSubmit={this.onSubmit}>
            {message !== '' &&
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>Error</strong> {message}
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          }
              <div className="form-group">
                <Input
                  name="isbn"
                  type="text"
                  value={isbn}
                  placeholder=" ISBN"
                  onChange={this.onChange}
                  label="ISBN" />
              </div>
              <div className="form-group">
                <Input
                  name="title"
                  type="text"
                  value={title}
                  placeholder=" Title"
                  onChange={this.onChange}
                  label="Title" />
              </div>
              <div className="form-group">
              <Input
                  name="author"
                  type="text"
                  value={author}
                  placeholder=" Author"
                  onChange={this.onChange}
                  label="Author" />
              </div>
              <div className="form-group">
                <label htmlFor="short_description" className="sr-only">Short Description:</label>
                <textArea className="form-control" name="shortDescription" onChange={this.onChange} placeholder="Short Description" cols="80" rows="2">{shortDescription}</textArea>
              </div>
              <div className="form-group">
                <label htmlFor="description" className="sr-only">Description:</label>
                <textArea className="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
              </div>
              <div className="form-group">
                <Input
                  name="publishedYear"
                  type="number"
                  value={publishedYear}
                  placeholder=" Published Year"
                  onChange={this.onChange}
                  label="Published Date" />
              </div>
              <div className="form-group">
                <Input
                  name="publisher"
                  type="text"
                  value={publisher}
                  placeholder=" Publisher"
                  onChange={this.onChange}
                  label="Publisher" />
              </div>
              <div className="form-group">
                <Input
                  name="category"
                  type="text"
                  value={category}
                  placeholder=" Category"
                  onChange={this.onChange}
                  label="Category" />
              </div>
              <div className="form-group">
                <Input
                  name="price"
                  type="number"
                  value={price}
                  placeholder=" Price"
                  onChange={this.onChange}
                  label="Price" />
              </div>
              <div className="form-group">
                  <Input
                  name="imageURL"
                  type="text"
                  value={imageURL}
                  placeholder=" Image URL"
                  onChange={(e) => { this.onChange(e); this.fileSelectHandler(e) } }
                  label="Image" />
                <img src={this.state.imageURL} alt="img" />
              </div>
              <button type="submit" className="btn btn-secondary">Add Book</button>
            </form>
        </div>
      </div>
    );
  }
}

export default CreateBook;