import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import CommentComponent from '../../components/comments/CommentComponent';

const composer = ({ text, date, userId, read, ideaId, index }, onData) => {
    const sub = Meteor.subscribe('user.profile', userId);
    if (sub.ready()) {
        const user = Meteor.users.findOne({ _id: userId });
        let name =  user.profile && (user.profile.firstName + ' ' + user.profile.lastName) || user.emails[0].address || 'Sin Profile';
        let img = undefined;
        let color = '#337ab7';
        onData(null, { text, date, name, img, color, read, ideaId, index });
    }
};

export default composeWithTracker(composer, Loading)(CommentComponent);