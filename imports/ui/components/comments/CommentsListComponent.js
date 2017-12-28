import React from 'react';
import Loading from '../../components/Loading';
import _ from 'lodash';
import moment from 'moment';
import CommentContainer from '../../containers/comments/CommentContainer';

const CommentsListComponent = ({ comments }) => {
    return (
        <div className="ci-list">
            {
                _.map(comments, (comment, index) => {
                    return <CommentContainer text={comment.text} date={comment.createdAt} userId={comment.userId} key={index} />
                })
            }
        </div>
    )
}

export default CommentsListComponent;