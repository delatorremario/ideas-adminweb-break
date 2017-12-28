import React, { Component } from 'react';
import { Accordion, Panel } from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';
import CommentsListComponent from './CommentsListComponent';
import CommentSendComponent from './CommentSendComponent';

const CommentsComponent = ({ idea }) => {
    // console.log('CC', idea);
    idea._id = '28947892379874';
    return (
        <div className="ci-component">
            <CommentsListComponent comments={idea.comments} />
            <CommentSendComponent ideaId={idea._id} viewers={idea.viewers} />
        </div>
    )

    
}

export default CommentsComponent;