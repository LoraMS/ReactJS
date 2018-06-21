import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default class Header extends Component {
    render(){
        const { loggedIn, onLogout } = this.props;

        return(
            <nav class="nav container">
                <Link className="logo nav-link" to="/"><span>The Bookstore</span></Link>
                <NavLink exact to="/" activeClassName="active" className="nav nav-link">Home</NavLink>
                <NavLink to="/all" activeClassName="active" className="nav nav-link">Book List</NavLink>
                <NavLink to="/about" activeClassName="active" className="nav nav-link">Contact Us</NavLink>
                {!loggedIn && <NavLink to="/register" activeClassName="active" className="nav nav-link">Register</NavLink>}
                {!loggedIn && <NavLink to="/login" activeClassName="active" className="nav nav-link">Login</NavLink>}
                {loggedIn && <NavLink to="/create" activeClassName="active" className="nav  nav-link">Create</NavLink>}
                {loggedIn && <a href="javascript:void(0)" onClick={onLogout} className="nav nav-link">Logout</a>}
            </nav>
        );
    }
}