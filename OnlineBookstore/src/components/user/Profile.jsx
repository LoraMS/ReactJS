import React, { Component } from 'react';

export default class Profile extends Component {
    render() {
        const name = localStorage.getItem("name");
        return (
            <div className="container">
                <div class="card">
                    <img class="card-img-top" src={require('./default-profile.png')} alt="profile_img" />
                    <div class="card-body">
                        <h3 class="card-title">User Profile Information</h3>
                        <p class="card-text"><strong>Username: </strong>{name}</p>
                        <p class="card-text"><strong>My Favorites: </strong><span class="badge badge-secondary"></span></p>
                        <p class="card-text"><strong>My Events: </strong><span class="badge badge-secondary"></span></p>
                    </div>
                </div>
            </div>
        );
    }
}

