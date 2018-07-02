import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default class Header extends Component {
    render(){
        const { loggedIn, onLogout } = this.props;

        return(
            <header>
            <nav class="nav container">
                <Link className="logo nav-link" to="/"><span>The Bookstore</span></Link>
                <NavLink exact to="/" activeClassName="active" className="nav nav-link">Home</NavLink>
                <NavLink to="/catalog" activeClassName="active" className="nav nav-link">Books</NavLink>
                <NavLink to="/events" activeClassName="active" className="nav nav-link">Events</NavLink>
                <NavLink to="/about" activeClassName="active" className="nav nav-link">Contact Us</NavLink>
                {!loggedIn && <NavLink to="/register" activeClassName="active" className="nav nav-link">Register</NavLink>}
                {!loggedIn && <NavLink to="/login" activeClassName="active" className="nav nav-link">Login</NavLink>}
                {/* {loggedIn && <NavLink to="/create" activeClassName="active" className="nav  nav-link">Create</NavLink>} */}
                {loggedIn && <div className="dropdown">
                <button className="btn dropdown-toggle btn-header" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Create</button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <Link to="/create" class="dropdown-item nav nav-link">Book</Link>
                    <Link to="/add" class="dropdown-item nav nav-link">Event</Link>
                </div>
                </div>}
                {loggedIn && <NavLink to="/profile" activeClassName="active" className="nav  nav-link">Profile</NavLink>}
                {loggedIn && <a href="javascript:void(0)" onClick={onLogout} className="nav nav-link">Logout</a>}
            </nav>
            </header>
        );
    }
}