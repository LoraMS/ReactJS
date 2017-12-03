import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

class Menu extends Component{
    constructor(props){
        super(props);

        this.state = '';
    }

    render(){
        return(
        <div id="menu">
            <div className="title">Navigation</div>
            <Link className="nav" to="/catalog">Catalog</Link>
            <Link className="nav" to="/submitLink">Submit Link</Link>
            <Link className="nav" to="/myPosts">My Posts</Link>
        </div>
        );
    }
}

export default Menu;