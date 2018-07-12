import React, { Component } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import Input from './../../common/Input';

class CreateEvent extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      eventDate: null,
      hours: '',
      imageURL: '',
      category: '',
      users: null,
      message: '',
    };
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

    const { title, description, eventDate, hours, imageURL, category } = this.state;

    axios.post('/api/event', { title, description, eventDate, hours, imageURL, category })
      .then((result) => {
        this.props.history.push("/events")
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.setState({ message: 'Create failed. Check the form for errors' });
        }
      });
  }

  render() {
    const { title, description, eventDate, hours, imageURL, category, message } = this.state;
    return (
      <div className="container">
        <div className="panel">
        <h2 className="create-title">
              Add Event
            </h2>
            <form onSubmit={this.onSubmit}>
            {message !== '' &&
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>Error</strong> {message}
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>}
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
                <label htmlFor="description" className="sr-only">Description:</label>
                <textArea className="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
              </div>
              <div className="form-group">
                <Input
                  name="eventDate"
                  type="date"
                  value={eventDate}
                  placeholder=" Event Date"
                  onChange={this.onChange}
                  label="Event Date" />
              </div>
              <div className="form-group">
                <Input
                  name="hours"
                  type="text"
                  value={hours}
                  placeholder=" Hours"
                  onChange={this.onChange}
                  label="Hours" />
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
                  name="imageURL"
                  type="text"
                  value={imageURL}
                  placeholder=" Image URL"
                  onChange={this.onChange}
                  label="Image" />
                  <img src={this.state.imageURL} alt="img" />
              </div>
              <button type="submit" className="btn btn-secondary">Add Event</button>
            </form>
        </div>
      </div>
    );
  }
}

export default CreateEvent;