import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HotelCard extends Component {
    render(){
        return(
            <div className="hotel-card">
                <h3>{this.props.props.name}</h3>
                <img src={this.props.props.image} alt="hotel"/>
                <div>
                    <p>{this.props.props.name} in {this.props.props.location}</p>
                    <Link to={'/details/' + this.props.props.id}>View Details</Link>
                </div>
            </div>
        );
    }
}

/*
props
createdOn "2017-11-17T16:42:06.074Z"
description "Hotel in Monte Catlo"
id 2
image "http://www.hotelroomsearch.net/im/hotels/tr/monte-carlo-hotel-22.jpg"
location "Monte Carlo"
name "Monte Carlo Hotel"
numberOfRooms 200
parkingSlots 300
*/