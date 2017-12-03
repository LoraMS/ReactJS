import React, { Component } from 'react';
import './SubmitLink.css';
import requestHandler from './../../../utils/requestHandler';

class SubmitLink extends Component{
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
        this.setState({ author: localStorage.getItem('username') });
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();
        requestHandler.createPost(this.state).then(data => {
            // console.log(data);
            window.location.replace('/catalog');
        });
    }

    render(){
        return(
            <section id="viewSubmit">
            <div className="submitArea">
                <h1>Submit Link</h1>
                <p>Please, fill out the form. A thumbnail image is not required.</p>
            </div>
            <div className="submitArea formContainer">
                <form id="submitForm" className="submitForm" onSubmit={this.onSubmit}>
                    <label>Link URL:</label>
                    <input name="url" value={this.state.url} type="text" onChange={this.onChange} />
                    <label>Link Title:</label>
                    <input name="title" value={this.state.title} type="text" onChange={this.onChange} />
                    <label>Link Thumbnail Image (optional):</label>
                    <input name="imageUrl" value={this.state.imageUrl} type="text" onChange={this.onChange} />
                    <label>Comment (optional):</label>
                    <textarea name="description" value={this.state.description} onChange={this.onChange}></textarea>
                    <input id="btnSubmitPost" value="Submit" type="submit" />
                </form>
            </div>
        </section>
        );
    }
}

export default SubmitLink;
