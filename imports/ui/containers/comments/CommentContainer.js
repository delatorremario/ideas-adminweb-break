import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import CommentComponent from '../../components/comments/CommentComponent';
import Files from '../../../api/files/files';

const composer = ({ text, date, userId, read, ideaId, index }, onData) => {
    const sub = Meteor.subscribe('user.profile', userId);
    if (sub.ready()) {
        const user = Meteor.users.findOne({ _id: userId });
        const name =  user.profile && (user.profile.firstName + ' ' + user.profile.lastName) || user.emails[0].address || _.last(user.emails).address;
        const color =  (user.profile && user.profile.color) || '#337ab7';
        onData(null, { text, date, name, userId, color, read, ideaId, index });
    }
};

export default composeWithTracker(composer, Loading)(CommentComponent);