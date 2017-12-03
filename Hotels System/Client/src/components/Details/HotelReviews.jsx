import React, { Component } from 'react';
import { postReview, listReviews } from './../../api/remote';
import Reviews from './Reviews';
import toastr from 'toastr';

export default class HotelReviews extends Component {
    constructor(props){
        super(props);

        this.state= {
            comment: '',
            rating: 5,
            reviews: [],
            error: false,
            submitting: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount(){
        this.getReviews();
    }

    async getReviews(){
        const res = await listReviews(this.props.id);
        // console.log(res); // 0:{rating: 5, comment: "Good", user: "user", createdOn:2017-11-18T09:41:33.357Z"}
        this.setState({reviews: res})
    }

    onChangeHandler(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault(); 
        // this.setState({ submitting: true });  

        const res = await postReview(this.props.id, this.state.comment, Number(this.state.rating));
        if (!res.success) {
            this.setState({ error: res});
            return;
        }
        // this.setState({ submitting: false });
        const reviews = this.state.reviews.slice();
        reviews.push(res.review);
        this.setState({reviews});
        this.getReviews();       
        toastr.success('Review posted successfully'); 
    }

    render(){
        const reviewStyle ={
            'fontWeight': 'normal',
            'marginRight': '10px'
        };

        let errors = null;
        if (this.state.error) {
            errors = (
                <div>
                    <h2 style={{color: 'red'}}>{this.state.error.message}</h2>
                    {Object.keys(this.state.error.errors).map(k => {
                        return <p key={k}>{this.state.error.errors[k]}</p>;
                    })}
                </div>
            );
        }

        return(
            <div className="hotel-reviews">
                <form onSubmit={this.onSubmitHandler}>
                    <h3>Leave a review</h3>
                    {errors}
                    <div>
                    <span style={reviewStyle}>Rating:</span>
                    <select name="rating" id="rating" value={this.state.rating} onChange={this.onChangeHandler}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    </div>
                    <br/>
                    <div>Comment</div>
                    <textarea 
                    style={{ width: '30%', height: '100px' }} 
                    name="comment"
                    value={this.state.comment}
                    onChange={this.onChangeHandler}/>
                    <br/>
                    <input style={{marginLeft: "0"}} type="submit" value="Post Review "/>
                </form> 
                <h3>User Reviews</h3>
                {this.state.reviews.map((r, i) => {
                    return <Reviews 
                    key={i}
                    rating={r.rating}
                    createdOn={r.createdOn}
                    user={r.user}
                    comment={r.comment}/>;
                })}
            </div>
        );
    }
}
