import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import requestHandler from './../../../utils/requestHandler';
import './PostDetails.css';
import Comment from './../Comment/Comment';
import AddComment from './../AddComment/AddComment';

class PostDetails extends Component{
    constructor(props){
        super(props);

        this.state = {
            comments: [],
            post: {}
        };
    }

    componentDidMount() {
        const postId = this.props.match.params.postId;
        requestHandler.getPostById(postId)
            .then(post => {
                this.setState({ post: post });
            })
            .then(() => {
               requestHandler.getCommentsById(postId)
               .then(comments => {
                   this.setState({ comments: comments });
               });
            });
    }

    render(){
        // console.log(this.state.post);
        // console.log(this.state.comments);        
        return (
            <section id="viewComments">
            <div className="post">
                <div className="col thumbnail">
                    <a href={this.state.post.url}>
                        <img src={this.state.post.imageUrl} alt="post-avatar"/>
                    </a>
                </div>
                <div className="post-content">
                    <div className="title">
                        <a href={this.state.post.url}>
                        {this.state.post.title}
                        </a>
                    </div>
                    <div className="details">
                        <p>{this.state.post.description}</p>
                        <div className="info">
                            submitted by {this.state.post.author}
                        </div>
                        <div className="controls">
                            <ul>
                                <li className="action"><Link className="editLink" to={`/editPost/${this.state.post._id}`}>edit</Link></li>
                                <li className="action"><Link className="deleteLink" to={`/deletePost/${this.state.post._id}`}>delete</Link></li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div className="clear"></div>
            </div>
            <div className="post post-content">
                <AddComment id={this.props.match.params.postId}/>
            </div>
            <article className="post post-content">
            {this.state.comments.map((comment) => {
                return <Comment key={comment._id} props={comment}/>;
            })}
            </article>
        </section>
        );
    }
}

export default PostDetails;