import React, { Component } from 'react';

import LogIn from './Login';
import Register from './Register';
import About from './../common/About';

class Home extends Component{
    constructor(props){
        super(props);

        this.state = '';
    }

    render(){
        return(
            <section id="viewWelcome">
            <div className="welcome">
                <div className="signup">
                    <LogIn />
                    <Register />
                </div>

                <div className="about">
                    <About />
                </div>
            </div>
        </section>
        );
    }
}

export default Home;