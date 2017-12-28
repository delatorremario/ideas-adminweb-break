import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import CommentComponent from '../../components/comments/CommentComponent';

const composer = ({ text, date, userId }, onData) => {
    const sub = Meteor.subscribe('user.profile', userId);
    if (sub.ready()) {
        const user = Meteor.users.findOne({ _id: userId });
        let name = user.profile && user.profile.lastName + ' ' + user.profile.firstName || user.emails[0].address || 'Sin Profile';
        let img = 'url("http://localhost:3000/cdn/storage/Files/EqSsJ9pqaAkKwWT5X/original/EqSsJ9pqaAkKwWT5X")';
        onData(null, { text, date, name, img });
    }
};

export default composeWithTracker(composer, Loading)(CommentComponent);