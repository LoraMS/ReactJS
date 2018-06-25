import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Input from './../common/Input';


class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      message: '',
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/api/event/'+this.props.match.params.id)
      .then(res => {
        this.setState({ event: res.data });
      });
  }

  onChange = (e) => {
    const state = this.state.event
    state[e.target.name] = e.target.value;
    this.setState({event:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, eventDate, hours, imageURL, category } = this.state.event;

    axios.put('/api/event/'+this.props.match.params.id, { title, description, eventDate, hours, imageURL, category })
      .then((result) => {
        this.props.history.push("/event/"+this.props.match.params.id)
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.setState({ message: 'Edit failed. Check the form for errors' });
        }
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel">
            <h2 class="edit-title">
              Edit Event
            </h2>
            <form onSubmit={this.onSubmit}>
            {this.state.message !== '' &&
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>Error</strong> {this.state.message}
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          }
              <div class="form-group">
              <Input
                  name="title"
                  type="text"
                  value={this.state.event.title}
                  placeholder=" Title"
                  onChange={this.onChange}
                  label="Title" />
              </div>
              <div class="form-group">
                <label htmlFor="description" className="sr-only">Description:</label>
                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{this.state.event.description}</textArea>
              </div>
              <div class="form-group">
              <Input
                  name="eventDate"
                  type="text"
                  value={this.state.event.eventDate}
                  placeholder=" Event Date"
                  onChange={this.onChange}
                  label="Event Date" />
              </div>
              <div class="form-group">
              <Input
                  name="hours"
                  type="text"
                  value={this.state.event.hours}
                  placeholder=" Hours"
                  onChange={this.onChange}
                  label="Hours" />
              </div>
              <div class="form-group">
                <Input
                  name="category"
                  type="text"
                  value={this.state.event.category}
                  placeholder=" Category"
                  onChange={this.onChange}
                  label="Category" />
              </div>
              <div class="form-group">
                  <Input
                  name="imageURL"
                  type="text"
                  value={this.state.event.imageURL}
                  placeholder=" Image URL"
                  onChange={this.onChange}
                  label="Image" />
                <img src={this.state.event.imageURL} alt="img" />
              </div>
              <Link to={`/event/${this.state.event._id}`} class="btn btn-secondary mr-3">Back to Event</Link>
              <button type="submit" class="btn btn-secondary">Edit Event</button>
            </form>
        </div>
      </div>
    );
  }
}

export default EditEvent;