import React, { Component } from 'react';
import left from './../resources/left.png';
import right from './../resources/right.png';

class Slider extends Component {
    constructor(props){
        super(props);

        this.state = { 
            focusedEpId: 0,
            imgUrl: '' 
        };

        this.getNewEp = id => {
            fetch('http://localhost:9999/episodePreview/' + id)
            .then(data => {
                return data.json();
            })
            .then(parsedData => {
                this.setState({ imgUrl: parsedData.url });
                this.setState({ focusedEpId : parsedData.id });
            });
        };
    }

    componentDidMount(){
        fetch('http://localhost:9999/episodePreview/' + this.state.focusedEpId)
        .then(data => {
            // console.log(data);
            return data.json();
        })
        .then(parsedData => {
            // console.log(parsedData);
            this.setState({ imgUrl: parsedData.url });
        });
    }

    render() {
        return ( 
            <div className="wrapper">
                <img onClick={() => {
                    this.getNewEp(Number(this.state.focusedEpId) - 1);
                }} className="case-left slider-button" src={left} alt="leftArrow" />
                <img className="sliderImg" src={ this.state.imgUrl } alt="focusedEp" />
                <img onClick={() => {
                    this.getNewEp(Number(this.state.focusedEpId) + 1);
                }} className="case-right slider-button" src={right} alt="rightArrow" />
            </div>
        );
    }
}

export default Slider;
