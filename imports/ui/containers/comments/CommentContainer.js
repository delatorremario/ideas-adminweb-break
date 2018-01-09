import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import CommentComponent from '../../components/comments/CommentComponent';
import Files from '../../../api/files/files';
import Comments from '../../../api/comments/comments';

const composer = ({ commentId }, onData) => {
    const sub1 = Meteor.subscribe('comments.byId', commentId);
    if (sub1.ready()) {
        const comment = Comments.findOne({ _id: commentId }, { sort: { createdAt: 1 } });
        const userId = comment.userId;
        const sub2 = Meteor.subscribe('user.profile', userId);
        if (sub2.ready()) {
            const user = Meteor.users.findOne({ _id: userId });
            const text = comment.text;
            const date = comment.createdAt;
            const name = user.profile && (user.profile.firstName + ' ' + user.profile.lastName) || user.emails[0].address || _.last(user.emails).address;
            const color = (user.profile && user.profile.color) || '#337ab7';
            onData(null, { text, date, name, userId, color });
        }
    }
};

export default composeWithTracker(composer, Loading)(CommentComponent);