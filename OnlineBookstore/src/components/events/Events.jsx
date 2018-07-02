import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './Events.css';

class Events extends Component {
    constructor(props){
        super(props);
        this.state= {
            events: []
        }; 
    }

    componentDidMount() {
        axios.get('/api/event')
          .then(res => {
            this.setState({ events: res.data });
          })
          .catch((error) => {
            if(error.response.status === 401) {
              this.props.history.push("/events");
            }
          });
      }

    render(){
        moment.locale('en');
        return(
            <div className="container">
                <h2 className="event-title">Events</h2>
                {this.state.events.map(event=> 
                    <div className="row mt-3 pt-2 pb-2 bg-light" key={event._id}>
                        <div className="col-md-2">
                            <Link to={`/event/${event._id}`}>
                                <img className="events-img" src={event.imageURL} alt="event" data-holder-rendered="true"/>
                            </Link>
                        </div>
                        <div className="col-md-8 offset-md-1">
                            <Link to={`/event/${event._id}`}>
                                <h5 className="card-title text-muted"><u>{event.title}</u></h5>
                            </Link>
                            <p>{moment(event.eventDate).format('LL')} | {event.hours}</p>
                            <p><Link to={`/evcategory/${event.category}`} className="category">{event.category}</Link></p>
                            <Link to={`/event/${event._id}`} type="button" className="btn btn-sm btn-secondary mr-2">View More</Link>
                                </div>
                            </div>                    
                )}
            
            </div>
        );
    }
}

export default Events;
                              


        
      
