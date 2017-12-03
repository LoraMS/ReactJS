import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Catalog from './Catalog/Catalog';
import SubmitLink from './SubmitLink/SubmitLink';
import MyPosts from './MyPosts/MyPosts';
import EditPost from './EditPost/EditPost';
import DeletePost from './DeletePost/DeletePost';
import PostDetails from './PostDetails/PostDetails';
import DeleteComment from './DeleteComment/DeleteComment';

class ViewComponent extends Component{
    render(){
        return(
        <Switch>
            <Route exact path="/" component={ Catalog }/>
            <Route path="/catalog" component={ Catalog }/>
            <Route path="/submitLink" component={ SubmitLink }/>        
            <Route path="/myPosts" component={ MyPosts }/> 
            <Route path='/editPost/:postId' component={EditPost} />
            <Route path='/deletePost/:postId' component={DeletePost} />
            <Route path='/postDetails/:postId' component={ PostDetails } />   
            <Route path='/deleteComment/:commentId' component={ DeleteComment } />                    
        </Switch>
        );
    }
}

export default ViewComponent;