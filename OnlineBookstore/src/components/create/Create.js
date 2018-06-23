import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
// import FileUpload from './FileUpload.jsx';

class Create extends Component {

  constructor() {
    super();
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
      // selectedFile: '',
    };
  }

  fileSelectHandler = event => {
    this.setState({
      // selectedFile: event.target.files[0]
      imageURL: event.target.value
    })

  }

  // fileUploadHandler = () => {
  //   const fd = new FormData();
  //   // fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
  //   // axios.post('/upload', fd)
  //   // .then(res => {
  //   //   console.log(res)
  //   // });

  //   fd.append('file', this.state.selectedFile);
  //   fd.append('filename', this.state.selectedFile.name);

  //   fetch('http://localhost:3000/upload', {
  //     method: 'POST',
  //     body: fd,
  //   }).then((response) => {
  //     response.json().then((body) => {
  //       this.setState({ imageURL: `http://localhost:3000/${body.file}` });
  //     });
  //   });
  // }

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
        this.props.history.push("/catalog")
      });
  }

  render() {
    const { isbn, title, author, shortDescription, description, publishedYear, publisher, imageURL, price, category } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD BOOK
            </h3>
          </div>
          <div class="panel-body">
            {/* <h4><Link to="/all">Book List</Link></h4> */}
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="isbn">ISBN:</label>
                <input type="text" class="form-control" name="isbn" value={isbn} onChange={this.onChange} placeholder="ISBN" />
              </div>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="author">Author:</label>
                <input type="text" class="form-control" name="author" value={author} onChange={this.onChange} placeholder="Author" />
              </div>
              <div class="form-group">
                <label for="short_description">Short Description:</label>
                <textArea class="form-control" name="shortDescription" onChange={this.onChange} placeholder="Short Description" cols="80" rows="3">{shortDescription}</textArea>
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
              </div>
              <div class="form-group">
                <label for="published_date">Published Date:</label>
                <input type="number" class="form-control" name="publishedYear" value={publishedYear} onChange={this.onChange} placeholder="Published Year" />
              </div>
              <div class="form-group">
                <label for="publisher">Publisher:</label>
                <input type="text" class="form-control" name="publisher" value={publisher} onChange={this.onChange} placeholder="Publisher" />
              </div>
              <div class="form-group">
                <label for="category">Category:</label>
                <input type="text" class="form-control" name="category" value={category} onChange={this.onChange} placeholder="Category" />
              </div>
              <div class="form-group">
                <label for="price">Price:</label>
                <input type="number" class="form-control" name="price" value={price} onChange={this.onChange} placeholder="Price" />
              </div>
              <div class="form-group">
              <label for="imageURL">Image:</label>
                  {/* <input type="file" name="selectedFile" onChange={this.fileSelectHandler}/> */}
                  <input type="text" class="form-control" name="imageURL" value={imageURL} 
                  onChange={ (e) => { this.onChange(e); this.fileSelectHandler(e) } }
                  placeholder="Image URL" />
                {/* <div><button onClick={this.fileUploadHandler}>Upload</button></div> */}
                <img src={this.state.imageURL} alt="img" />
                {/* <FileUpload /> */}
              </div>
              <button type="submit" class="btn btn-default">Add Book</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;