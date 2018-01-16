import React from 'react';
import { Meteor } from 'meteor/meteor';
import Loading from '../../components/Loading';
import { Bert } from 'meteor/themeteorchef:bert';

const componentDidMount = () => {
    $('html,body').stop(true, true);
    $('html,body').animate({ scrollTop: document.body.scrollHeight }, 500, "swing");
}

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
        componentDidMount();
    })
}

const CommentSendComponent = ({ ideaId }) => {
    return (
        <div className="ci-new-position">
            <div className="ci-new-container">
                <form className="ci-new" onSubmit={send(ideaId).bind(this)}>
                    <label htmlFor="newComment">
                        <i className="ci-new-icon fa fa-comment-o"></i>
                    </label>
                    <input type="text" name="newComment" id="newComment" className="ci-new-input" placeholder="Comentar" autoComplete="off"></input>
                    <button className="ci-new-icon fa fa-send-o"></button>
                </form>
            </div>
        </div>
    )
}

export default CommentSendComponent;