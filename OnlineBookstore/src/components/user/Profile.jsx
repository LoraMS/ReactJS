import React, { Component } from 'react';
import './Profile.css';

export default class Profile extends Component {
    render() {
        const name = localStorage.getItem("name");
        const imgURL = 'https://drive.google.com/thumbnail?id=11uo_6bgKcjtkZkSJQYj47CTa-_C-hh0P';
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <div class="card">
                        <img class="card-img-top profile-img" src={imgURL} alt="profile_img" />
                            <div class="card-body">
                                <h5 class="card-title">User Profile Information</h5>
                                <p class="card-text"><strong>Username: </strong>{name}</p>
                                <p class="card-text"><strong>My Books List: </strong><span class="badge badge-secondary"></span></p>
                                <p class="card-text"><strong>My Events: </strong><span class="badge badge-secondary"></span></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7 offset-md-2">
                    
                        
                    </div>
                </div>

            </div>
        );
    }
}

