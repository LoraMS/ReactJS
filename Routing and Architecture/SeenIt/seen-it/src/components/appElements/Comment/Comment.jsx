import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dateConvertor from '../../../utils/dateConvertor';
import './Comment.css';

class Comments extends Component{
    constructor(props){
        super(props);

        this.state= '';
    }

    render(){
        const commentId = this.props.props._id;
        // console.log(this.props);
        return(
            <div>
            <p>{this.props.props.content}</p>
            <div className="info">
                submitted {dateConvertor(this.props.props._kmd.lmt)} ago by {this.props.props.author} | <Link to={`/deleteComment/${commentId}`} className="deleteLink">delete</Link>
            </div>
            </div>
        );
    }
}

export default Comments;