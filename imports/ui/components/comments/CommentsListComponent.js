import React from 'react';
import Loading from '../../components/Loading';
import _ from 'lodash';
import moment from 'moment';
import CommentContainer from '../../containers/comments/CommentContainer';

const CommentsListComponent = ({ comments, ideaId }) => {
    const userId = Meteor.userId();
    comments = _.filter(comments, (comment) => _.find(comment.viewers, (v) => v.userId === userId) ? true : false)
    return (
        <div className="ci-list">
            {
                _.map(comments, (comment, index) => {
                    const read = _.find(comment.viewers, v => (v.userId === userId) && !v.viewedAt)
                    return <CommentContainer index={index} read={!!read} text={comment.text} date={comment.createdAt} ideaId={ideaId} userId={comment.userId} key={index} />
                })
            }
        </div>
    )
}

export default CommentsListComponent;