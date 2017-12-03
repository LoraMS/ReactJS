import React, { Component } from 'react';
import { viewDetails } from './../../api/remote';
import HotelReviews from './HotelReviews';

export default class HotelDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            hotel: {}
        };
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        viewDetails(id)
        .then(data => {
            this.setState({ hotel: data });
        });
    }

    render(){
        return(
            <div className="hotel-card-details">
                <h3>{this.state.hotel.name}</h3>
                <img src={this.state.hotel.image} alt="hotel"/>
                <div>
                    <p><span>Location:</span> {this.state.hotel.location}</p>
                    <p><span>Description:</span> {this.state.hotel.description}</p>
                    <p><span>Number of Rooms:</span> {this.state.hotel.numberOfRooms}</p>
                    <p><span>Parking Slots:</span> {this.state.hotel.parkingSlots}</p>
                </div>
                <HotelReviews id={Number(this.props.match.params.id)}/>
            </div>
        );
    }
}

/*
id: "2", name: "Monte Carlo Hotel", location: "Monte Carlo", description: "Hotel in Monte Catlo", numberOfRooms: 200,image:"http://www.hotelroomsearch.net/im/hotels/tr/monte-carlo-hotel-22.jpg", parkingSlots:300
*/