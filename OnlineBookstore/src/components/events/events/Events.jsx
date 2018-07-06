import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import EventsComponent from './EventsComponents';
import Search from './../../common/Search';
import PageNotFound from './../../common/PageNotFound';
import './Events.css';

class Events extends Component {
    constructor(props){
        super(props);
        this.state= {
            events: [],
            participate: '',
            query: '',
            buttonPart: true,
        }; 
    }

    componentDidMount() {
        const name = localStorage.getItem('name');
        axios.get('/api/event')
          .then(res => {
            this.setState({ events: res.data });
          })
          .catch((error) => {
            if(error.response.status === 401) {
              this.props.history.push("/events");
            }
          });

        axios.get('/api/auth/all/' + name)
        .then(res => {
          const currentUser = res.data;
          const index = currentUser.eventList.findIndex(e=> e.eventId === this.props.match.params.id);
          if(index > -1){
            this.setState({ participate: false });
          } else {
          this.setState({ participate: true });
          }
        });
    }

    handleSearch(event){
		this.setState({query: event.target.value});
    }
    
    eventAction(eventId, title){
        const name = localStorage.getItem('name');
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        if (!this.state.participate) {
          axios.put('/api/auth/leave', {eventId, name})
          .then((result) => {
            this.setState({
              participate: true
            });
          })
          .catch((error) => {
                 if(error.response.status === 401) {
                 this.props.history.push("/login");
                }
          });
        } else {
          axios.put('/api/auth/participate', {eventId, title, name})
          .then((result) => {
            this.setState({
              participate: false
            });
          })
          .catch((error) => {
                 if(error.response.status === 401) {
                 this.props.history.push("/login");
                }
          });
        }
      }

    render(){
        moment.locale('en');
        let view;
        const label = this.state.participate ?  'Participate' : 'Leave';

        let filteredItems = this.state.events.filter(e => e.title.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1);
        
        if (filteredItems.length > 0){
        view = <EventsComponent events={filteredItems} eventAction={this.eventAction.bind(this)} buttonPart={this.state.buttonPart} label={label}/>
        } else if(filteredItems.length === 0){
        view =  <PageNotFound />
        } else {
        view = <EventsComponent events={this.state.events} eventAction={this.eventAction.bind(this)} buttonPart={this.state.buttonPart} label={label}/>
        }

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
                {view}
                {/* {this.state.events.map(event=> 
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
                            { moment(event.eventDate).isSameOrAfter() ? (
                                <button onClick={this.eventAction.bind(this, event._id, event.title)} type="button" className="btn btn-sm btn-secondary mr-1">{label}</button>
                            ) : (
                                <span className="event-title">This Event Has Passed</span>
                            )}
                        </div>
                    </div>                    
                )} */}
                </div>
            </div>
        );
    }
}

export default Events;
                              


        
      
