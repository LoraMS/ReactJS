import React, { Component } from 'react';

import observerMenu from './../utils/observer';

class Roster extends Component {
    constructor(props){
        super(props);

        this.state = { 
            rosterCollection : []
         };

    }

    componentDidMount(){
        fetch('http://localhost:9999/roster')
        .then(data => {
            return data.json();
        })
        .then(parsedData => {
            // console.log(response);
            this.setState({ rosterCollection: parsedData });
        });
    }

    render() {
        return(
            <div>
                {
                    this.state.rosterCollection.map((r, index) => {
                        return <img onClick={() => observerMenu.executeObserver('changeFocus', r.id )} key={index} className="roster-image" src={r.url} alt="roster" />;
                    })
                }
            </div>
        );
    }
}

export default Roster;