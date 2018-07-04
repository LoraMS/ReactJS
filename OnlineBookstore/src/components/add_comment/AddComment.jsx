import React, { Component } from 'react';
import {withRouter} from 'react-router';
import axios from 'axios';
import './AddComment.css';

class AddComment extends Component{
    constructor(props){
        super(props);

        this.state = {
            author: '',
            content: '',
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        this.setState({
            author: localStorage.getItem('name'),
        });
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();
        const {author, content} = this.state;
        axios.put(`/api/book/${this.props.id}/comments` , {author, content})
        .then((result) => {
            //  window.location.reload();
             this.props.history.go(0);
        })
        .catch((error) => {
            // if(error.response.status === 401) {
            //   this.setState({ message: 'Add Comment failed. Check the form for errors' });
            // }
            console.log(error);
        });
    }

    render(){
        return(
            <form id="commentForm" onSubmit={this.onSubmit}>
                <div class="form-group">
                <label htmlFor="content" className="sr-only">Review</label>
                <textarea class="form-control" name="content" placeholder="Review" cols="80" rows="2" value={this.state.content} onChange={this.onChange}></textarea>
                </div>
                <input type="submit" value="Add Review" className="btn btn-sm btn-secondary review-btn" />
            </form>
        );
    }
}
export default withRouter(AddComment);