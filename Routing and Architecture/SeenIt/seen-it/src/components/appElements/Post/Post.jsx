import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dateConvertor from '../../../utils/dateConvertor';
import './Post.css';

class Post extends Component{
    constructor(props){
        super(props);

        this.state = '';
    }

    render(){
        // console.log(this.props);
        return (
            <article className="post">   
            <div className="col rank">
                <span>{this.props.index}</span>
            </div>
            <div className="col thumbnail">
                <a href={this.props.props.url}>
                    <img src={this.props.props.imageUrl} alt="post-avatar" />
                </a>
            </div>
            <div className="post-content">
                <div className="title">
                    <a href={this.props.props.url}>
                        {this.props.props.title}
                    </a>
                </div>
                <div className="details">
                    <div className="info">
                        submitted {dateConvertor(this.props.props._kmd.lmt)} ago by {this.props.props.author}
                    </div>
                    <p>
                        {this.props.props.description}
                    </p>
                    <div className="controls">
                        <ul>
                            <li className="action"><Link className="commentsLink" to={`/postDetails/${this.props.props._id}`}>comments</Link></li>
                            <li className="action"><Link className="editLink" 
                            to={`/editPost/${this.props.props._id}`}>edit</Link></li>
                            <li className="action"><Link className="deleteLink" to={`/deletePost/${this.props.props._id}`}>delete</Link></li>
                        </ul>
                    </div>

                </div>
            </div>
        </article>
        );
    }
}

export default Post;