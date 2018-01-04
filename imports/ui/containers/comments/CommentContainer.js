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
        let name = user.profile && user.profile.lastName + ' ' + user.profile.firstName || user.emails[0].address || 'Sin Profile';
        let img = 'url("http://localhost:3000/cdn/storage/Files/EqSsJ9pqaAkKwWT5X/original/EqSsJ9pqaAkKwWT5X")';
        if(ready.get()) {
            Meteor.call('idea.readComment', ideaId, (err)=>{
                if(err) { console.log('err', err); return; }
                ready.set(true);
            })
        }
        if(!ready.get()) onData(null, { text, date, name, img });
    }
};

export default composeWithTracker(composer, Loading)(CommentComponent);