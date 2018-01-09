import React from 'react';
import { Meteor } from 'meteor/meteor';
import Loading from '../../components/Loading';
import { Bert } from 'meteor/themeteorchef:bert';

const send = (ideaId) => (event) => {
    event.preventDefault();
    let comment = {
        ideaId: ideaId,
        text: event.target.newComment.value,
        createdAt: new Date(),
        userId: Meteor.userId()
    }
    event.target.newComment.value = '';
    Meteor.call('comments.upsert', comment, (err) => {
        if (err) {
            Bert.alert(err.message, 'danger');
            return;
        }
    })
}

const CommentSendComponent = ({ ideaId }) => {
    return (
        <form className="ci-new" onSubmit={send(ideaId).bind(this)}>
            <label htmlFor="newComment">
                <i className="ci-new-icon fa fa-comment-o"></i>
            </label>
            <input type="text" name="newComment" id="newComment" className="ci-new-input" placeholder="Comentar" autoComplete="off"></input>
            <button className="ci-new-icon fa fa-send-o"></button>
        </form>
    )
}

export default CommentSendComponent;