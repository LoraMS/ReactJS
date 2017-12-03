import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MyPosts.css';
import requestHandler from './../../../utils/requestHandler';
import dateConvertor from '../../../utils/dateConvertor';

class MyPosts extends Component{
    constructor(props){
        super(props);

        this.state = {
            posts: []
        };
    }

    componentDidMount(){
        requestHandler.getMyPosts()
        .then(response => {
            // console.log(response)
            this.setState({ posts: response });
        });
    }

    render(){
        return(
            <section id="viewMyPosts">
            <div className="post post-content">
                <h1>Your Posts</h1>
            </div>
            <div className="posts">
            {this.state.posts.map((p, i) => {
                // console.log(p);
                return (
                    <article className="post" key={p._id}>   
            <div className="col rank">
                <span>{p.index}</span>
            </div>
            <div className="col thumbnail">
                <a href={p.url}>
                    <img src={p.imageUrl} alt="post-avatar" />
                </a>
            </div>
            <div className="post-content">
                <div className="title">
                    <a href={p.url}>
                        {p.title}
                    </a>
                </div>
                <div className="details">
                    <div className="info">
                        submitted {dateConvertor(p._kmd.lmt)} ago by {p.author}
                    </div>
                    <p>
                        {p.description}
                    </p>
                    <div className="controls">
                        <ul>
                            <li className="action"><Link className="commentsLink" to={`/postDetails/${p._id}`}>comments</Link></li>
                            <li className="action"><Link className="editLink" 
                            to={`/editPost/${p._id}`}>edit</Link></li>
                            <li className="action"><Link className="deleteLink" to={`/deletePost/${p._id}`}>delete</Link></li>
                        </ul>
                    </div>

                </div>
            </div>
        </article>
                );
            })}
            </div>
        </section>
        );
    }
}

export default MyPosts;
