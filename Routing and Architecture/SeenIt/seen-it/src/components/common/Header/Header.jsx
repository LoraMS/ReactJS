import React, { Component } from 'react'; 
import './Header.css';

class Header extends Component{
    constructor(props){
        super(props);

        this.state = '';
    }

    render(){
        const username = this.props.username;
        return (
            <header>
            <span className="logo">☃</span><span className="header">SeenIt</span>
            <div id="profile"><span>{username}</span> | <input type="submit" id="logout" value=" logout" onClick={this.props.logout} /></div>
        </header>
        );
    }
} 
    

export default Header;