import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import moment from 'moment';
import _ from 'lodash';

import Loading from '../../components/Loading.js';
import CommentsPage from '../../pages/comments/CommentsPage';
import Ideas from '../../../api/ideas/ideas';
import Comments from '../../../api/comments/comments';

const composer = ({ match }, onData) => {
    moment.locale('es');
    
    const subComments = Meteor.subscribe('comments.list');
    if (subComments.ready()) {
        const comments = Comments.find({}).fetch();
        console.log('comments',comments)
        const commentsIds = _.map(comments,'ideaId');
        const userId = Meteor.userId();
        const filters = { _id: { $in: commentsIds }, 'viewers.userId': userId }
        const subIdeas = Meteor.subscribe('ideas.filters', filters , 0);
        if (subIdeas.ready()) {
            const ideas = Ideas.find(filters, { sort: { date: -1 } }).fetch();
            onData(null, { ideas });
        }
    }
};

export default composeWithTracker(composer, Loading)(CommentsPage);
