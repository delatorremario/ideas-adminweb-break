import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import _ from 'lodash';

import Loading from '../../components/Loading.js';

import Ideas from '../../../api/ideas/ideas';
import NonViewedComponent from '../../components/nonViewed/NonViewedComponent';

const composer = ({ }, onData) => {
    const filter = {
        $and:
            [
                { 'comments.viewers.userId': Meteor.userId() },
                { 'comments.viewers.viewedAt': { $exists: true } }
            ]
    };

    const ideaSub = Meteor.subscribe('ideas.state.list', filter, 0);

    if (ideaSub.ready()) {
        const ideas = Ideas.find(filter).fetch();
        let number = 0;
        _.each(ideas, idea => {
            _.each(idea.comments, comment =>{
                const unread = _.filter(comment.viewers, (v) =>{
                    return  v.userId === Meteor.userId() && !v.viewedAt
                }) 
                number+=unread.length;
            })
        })
        console.log('number', number);
        onData(null, { number });

    }
};

export default composeWithTracker(composer, Loading)(NonViewedComponent);
