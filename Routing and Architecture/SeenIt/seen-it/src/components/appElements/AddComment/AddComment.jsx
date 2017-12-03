import React, { Component } from 'react';
import requestHandler from './../../../utils/requestHandler';

class AddComment extends Component{
    constructor(props){
        super(props);

        this.state = { 
            content: '',
            author: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);        
    }

    componentDidMount(){
        this.setState({ 
            author: localStorage.getItem('username'),
            postId: this.props.id
         });
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();
        requestHandler.addComment(this.state).then(data => {
            // console.log(data);
            window.location.replace('/catalog');
        });
    }

    render(){
        // console.log(this.state);
        // console.log(this.props);        
        return(
            <form id="commentForm" onSubmit={this.onSubmit}>
            <label>Comment</label>
            <textarea name="content" type="text" value={this.state.content} onChange={this.onChange}></textarea>
            <input type="submit" value="Add Comment" id="btnPostComment" />
        </form>
        );
    }
}

export default AddComment;