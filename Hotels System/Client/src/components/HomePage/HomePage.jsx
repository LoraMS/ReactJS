import React, { Component } from 'react';
import HotelList from './HotelsList';

export default class HomePage extends Component {
    render(){
        // console.log(this.props.match.params);
        return(
            <div className="container">
                <h1>Home Page</h1>
                <h3>Welcome to our Hotel System</h3>
                <br/>
                <br/>
                <HotelList page={this.props.match.params.page}/>
            </div>
        );
    }
}