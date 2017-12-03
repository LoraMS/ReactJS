import React, { Component } from 'react';

class Reviews extends Component{
    constructor(props){
        super(props);

        this.state = '';
    }

    // componentDidMount(){
    //     this.getReviews();
    // }

    // async getReviews(){
    //     const res = await listReviews(this.props.id);
    //     // console.log(res); // 0:{rating: 5, comment: "Good", user: "user", createdOn:2017-11-18T09:41:33.357Z"}
    //     this.setState({reviews: res})
    // }

    render(){
        return(
                <div style={{ borderBottom:'1px solid #000', width: '30%', marginBottom: '20px' }}>
                    <div>rating: {this.props.rating} | posted by {this.props.user} on {this.props.createdOn}</div>
                    <div>{this.props.comment}</div>
                </div>
        );
    }
}

export default Reviews;
