import React from 'react';
import Loading from '../../components/Loading';
import _ from 'lodash';
import moment from 'moment';
import CommentContainer from '../../containers/comments/CommentContainer';
import Comments from '../../../api/comments/comments';

const CommentsListComponent = ({ comments, ideaId }) => {
    return (
        <div className="ci-list">
            {
                _.map(comments, (comment, index) => {
                    const read = _.find(comment.viewers, v => (v.userId === Meteor.userId()) && !v.viewedAt)
                    return <CommentContainer commentId={comment._id} key={index} />
                })
            }
        </div>
    )
}

export default CommentsListComponent;