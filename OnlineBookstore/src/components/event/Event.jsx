import React, { Component } from 'react';
import './Event.css';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
          event: {}
        };
      }

    componentDidMount () {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/api/event/' + this.props.match.params.id)
        .then(res => {
            this.setState({ event: res.data });
          })
          .catch((error) => {
            if(error.response.status === 401) {
              this.props.history.push("/login");
            }
          });
     }

    delete(id){
        axios.delete('/api/event/'+id)
          .then((result) => {
            this.props.history.push("/events")
          });
      }

    render() {
        moment.locale('en');
        return(
            <div className="container">
            <h3 className="event-title">{this.state.event.title}</h3>
            <div className="row">
                <div className="col-md-3">
                <img src={this.state.event.imageURL} className="event-img" alt="event"/>
                </div>
                <div className="col-md-8 offset-md-1">
                <h5><u>About the Event</u></h5>
                {moment(this.state.event.eventDate).isSameOrAfter() < 1 && <div className="event-title">This Event Has Passed</div> }
                <p>{this.state.event.description}</p>
                </div>
            </div>
            <div className="bg-light p-3 mt-3 border">
            <h5><u>Details</u></h5>
            <p><strong>Date: </strong>{moment(this.state.event.eventDate).format('LL')}</p>
            <p><strong>Time: </strong>{this.state.event.hours}</p>
            <p><strong>Event Category: </strong>{this.state.event.category}</p>
            <Link to={`/editev/${this.state.event._id}`} class="btn btn-sm btn-secondary mr-1">Edit</Link>
            <button onClick={this.delete.bind(this, this.state.event._id)} class="btn btn-sm btn-secondary mr-1">Delete</button>
            {moment(this.state.event.eventDate).isSameOrAfter() > 0 && <button type="button" class="btn btn-sm btn-secondary mr-1">Participate</button>}
            </div>
            </div>
          );
      }
}

export default Event;