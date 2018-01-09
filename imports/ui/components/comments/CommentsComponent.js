import React, { Component } from 'react';
import { Accordion, Panel } from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';
import CommentsListContainer from '../../containers/comments/CommentsListContainer';
import CommentSendComponent from './CommentSendComponent';

const CommentsComponent = ({ idea }) => {
    return (
        <div className="ci-component">
            <CommentsListContainer ideaId={idea._id} />
            <CommentSendComponent ideaId={idea._id} viewers={idea.viewers} />
        </div>
    )
}

export default CommentsComponent;