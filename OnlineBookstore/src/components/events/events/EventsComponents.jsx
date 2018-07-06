import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class EventsComponent extends Component {
    render(){
        moment.locale('en');
        return(
            this.props.events.map(event=>   
                <div class="row mt-3 pt-2 pb-2 bg-light" key={event._id}>
                    <div className="col-md-2">
                        <Link to={`/event/${event._id}`}>
                            <img class="events-img" src={event.imageURL} alt="event" data-holder-rendered="true"/>
                        </Link>
                    </div>
                    <div className="col-md-8 offset-md-1">
                        <Link to={`/event/${event._id}`}>
                            <h5 class="card-title text-muted"><u>{event.title}</u></h5>
                        </Link>
                        <p>{moment(event.eventDate).format('LL')} | {event.hours}</p>
                        <p><Link to={`/evcategory/${event.category}`} className="category">{event.category}</Link></p>
                        <Link to={`/event/${event._id}`} type="button" class="btn btn-sm btn-secondary mr-2">View More</Link>
                        {this.props.buttonPart && moment(event.eventDate).isSameOrAfter() ? (
                            <button onClick={this.props.eventAction.bind(this, event._id, event.title)} type="button" className="btn btn-sm btn-secondary mr-1">{this.props.label}</button>
                        ) : (
                            this.props.buttonPart && <span className="event-title">This Event Has Passed</span>
                        )}
                    </div>
                </div>      
            )
        );
    }
}
