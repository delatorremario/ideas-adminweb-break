import React from 'react';
import { Meteor } from 'meteor/meteor';
import Loading from '../../components/Loading';

const send = (ideaId, viewers) => (event) => {
    event.preventDefault();
    let comment = {
        text: event.target.newComment.value,
        viewedAt: new Date(),
        userId: Meteor.userId(),
        viewers: viewers
    }
    event.target.newComment.value = '';
    Meteor.call('idea.saveComment', ideaId, comment, (err) => {
        if (err) {
            Bert.alert(err.message, 'danger');
            return;
        } else {
            setTimeout(() => {
                document.getElementById('newComment').focus();
            }, 1500);
        }
    });
}

const CommentSendComponent = ({ ideaId, viewers }) => {
    return (
        <form className="ci-new" onSubmit={send(ideaId, viewers).bind(this)}>
            <label htmlFor="newComment">
                <i className="ci-new-icon fa fa-comment-o"></i>
            </label>
            <input type="text" name="newComment" id="newComment" className="ci-new-input" placeholder="Comentar"></input>
            <button className="ci-new-icon fa fa-send-o"></button>
        </form>
    )
}

export default CommentSendComponent;