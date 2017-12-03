// eslint-disable-next-line
import React from 'react';
import requestHandler from './../../../utils/requestHandler';

const DeleteComment = (props) => {
    const commentId = props.match.params.commentId;
    
    requestHandler.deleteComment(commentId)
    .then((request) => {
        window.location.replace('/catalog');
    });
    
};

export default DeleteComment;