import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import CommentComponent from '../../components/comments/CommentComponent';

import { ReactiveVar } from 'meteor/reactive-var';



const composer = ({ text, date, userId, read, ideaId, index }, onData) => {
    const ready = new ReactiveVar(read)
    const sub = Meteor.subscribe('user.profile', userId);
    if (sub.ready()) {
        const user = Meteor.users.findOne({ _id: userId });
        let name =  user.profile && (user.profile.firstName + ' ' + user.profile.lastName) || user.emails[0].address || 'Sin Profile';
        let img = undefined;
        let color = '#337ab7';
        if (ready.get()) {
            console.log('ideaId', ideaId);
            Meteor.call('idea.readComment', ideaId, index, (err) => {
                if (err) { console.log('err', err); return; }
                ready.set(true);
            })
        }
        if (!ready.get()) onData(null, { text, date, name, img, color });
    }
};

export default composeWithTracker(composer, Loading)(CommentComponent);