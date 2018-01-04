import React from 'react';
import { Meteor } from 'meteor/meteor';
import Loading from '../../components/Loading';
import { Bert } from 'meteor/themeteorchef:bert';

const send = (ideaId, viewers) => (event) => {
    event.preventDefault();
    const userId = Meteor.userId();
    _.map(viewers, (viewer) => viewer.userId === userId && _.extend(viewer, { viewedAt: new Date() }));
    let comment = {
        text: event.target.newComment.value,
        createdAt: new Date(),
        userId: Meteor.userId(),
        viewers: viewers
    }
    event.target.newComment.value = '';
    Meteor.call('idea.saveComment', ideaId, comment, (err) => {
        if (err) {
            Bert.alert(err.message, 'danger');
            return;
        }
    });
}

const CommentSendComponent = ({ ideaId, viewers }) => {
    return (
        <form className="ci-new" onSubmit={send(ideaId, viewers).bind(this)}>
            <label htmlFor="newComment">
                <i className="ci-new-icon fa fa-comment-o"></i>
            </label>
            <input type="text" name="newComment" id="newComment" className="ci-new-input" placeholder="Comentar" autoComplete="off"></input>
            <button className="ci-new-icon fa fa-send-o"></button>
        </form>
    )
}

export default CommentSendComponent;