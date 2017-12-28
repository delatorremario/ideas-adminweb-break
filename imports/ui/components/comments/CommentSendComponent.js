import React from 'react';
import { Meteor } from 'meteor/meteor';
import Loading from '../../components/Loading';

const send = (ideaId, viewers) => (event) => {
    event.preventDefault();
    let comment = {
        comment: event.target.newComment.value,
        userId: Meteor.userId(),
        viewers: viewers
    }
    console.log('Comment', comment);
}

const CommentSendComponent = ({ ideaId, viewers }) => {
    return (
        <form className="ci-new" onSubmit={send(ideaId, viewers).bind(this)}>
            <label htmlFor="newComment">
                <i className="ci-new-icon fa fa-comment-o"></i>
            </label>
            <input type="text" name="newComment" id="newComment" className="ci-new-input" placeholder="Comentar"></input>
            <i className="ci-new-icon fa fa-send-o" onClick={send}></i>
        </form>
    )
}

export default CommentSendComponent;