import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Search from './../../common/Search';
import './Events.css';

class Events extends Component {
    constructor(props){
        super(props);
        this.state= {
            events: [],
            query: '',
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

    handleSearch(event){
		this.setState({query: event.target.value});
	}

    render(){
        moment.locale('en');
        let filteredItems = this.state.events.filter(e => e.title.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1);
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                    <h2 className="event-title">Events</h2>
                    </div>
                    <div className="col-md-4 offset-md-4">
                    <Search search={this.handleSearch.bind(this)} />
                    </div>
                </div>
                <div className="py-5">
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
            </div>
        );
    }
}

export default Events;
                              


        
      
