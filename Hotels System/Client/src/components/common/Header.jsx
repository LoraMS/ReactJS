import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default class Header extends Component {
    render(){
        const { loggedIn, onLogout } = this.props;

        return(
            <header>
                <Link className="logo" to="/"><span>Hotel System</span></Link>
                <NavLink exact to="/" activeClassName="active" className="nav">Home</NavLink>
                {!loggedIn && <NavLink to="/register" activeClassName="active" className="nav">Register</NavLink>}
                {!loggedIn && <NavLink to="/login" activeClassName="active" className="nav">Login</NavLink>}
                {loggedIn && <NavLink to="/create" activeClassName="active" className="nav">Create</NavLink>}
                {loggedIn && <a href="javascript:void(0)" onClick={onLogout} className="nav">Logout</a>}
            </header>
        );
    }
}