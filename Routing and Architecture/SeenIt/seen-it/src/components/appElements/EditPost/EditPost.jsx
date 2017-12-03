import React, { Component } from 'react';
import requestHandler from './../../../utils/requestHandler';

class EditPost extends Component{
    constructor(props){
        super(props);

        this.state = {
            url: '',
            imageUrl: '',
            title: '',
            description: '',
            author: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        const postId = this.props.match.params.postId;
        requestHandler.getPostById(postId)
        .then(p => {
            this.setState({ 
                url: p.url,
                imageUrl: p.imageUrl,
                title: p.title,
                description: p.description,
                author: localStorage.getItem('username')
            });
        });
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();
        const postId = this.props.match.params.postId;
        requestHandler.editPost(this.state, postId).then(data => {
            // console.log(data);
            window.location.replace('/catalog');
        });
    }

    render(){
        return(
            <section id="viewEdit">
                <div className="submitArea">
                    <h1>Edit Link</h1>
                    <p>Please, fill out the form. A thumbnail image/description is not required.</p>
                </div>
                <div className="submitArea formContainer">
                    <form id="editPostForm" className="submitForm" onSubmit={this.onSubmit}>
                        <label>Link URL:</label>
                        <input name="url" value={this.state.url} type="text" onChange={this.onChange} />
                        <label>Link Title:</label>
                        <input name="title" value={this.state.title} type="text" onChange={this.onChange} />
                        <label>Link Thumbnail Image (optional):</label>
                        <input name="imageUrl" value={this.state.imageUrl} type="text" onChange={this.onChange} />
                        <label>Comment (optional):</label>
                        <textarea name="description" value={this.state.description} onChange={this.onChange}>No desc</textarea>
                        <input id="btnEditPost" type="submit" value="Edit Post" />
                    </form>
                </div>
        </section>
        );
    }
}

export default EditPost;
