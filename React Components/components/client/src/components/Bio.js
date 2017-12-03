import React, { Component } from 'react';

class Bio extends Component{
    constructor(props){
        super(props);

        this.state = {
            charId: this.props.charId,
            currentChar: {}
        };
    }

    componentDidMount(){
        fetch('http://localhost:9999/character/' + this.state.charId)
        .then(data => {
            return data.json();
        })
        .then(parsedData =>{
            this.setState({ currentChar: parsedData });           
        });
    }

    componentDidUpdate() {
        fetch('http://localhost:9999/character/' + this.props.charId)
        .then(data => {
            return data.json();
        })
        .then(parsedData =>{
            this.setState({ currentChar: parsedData });           
        });
    }

    render(){
        return(
            <div className="char-container">
                <div>
                    <img className="char-image" src={this.state.currentChar.url} alt="char" />
                </div>
                <h3>{this.state.currentChar.name}</h3>
                <p className="char-bio">{this.state.currentChar.bio}</p>
            </div>
        );
    }
}

export default Bio;