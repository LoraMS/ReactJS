// eslint-disable-next-line
import React from 'react';
import requestHandler from './../../../utils/requestHandler';

const DeletePost = (props) => {
    const postId = props.match.params.postId;
    
    requestHandler.deletePost(postId)
    .then((request) => {
        window.location.replace('/catalog');
    });
    
};

export default DeletePost;