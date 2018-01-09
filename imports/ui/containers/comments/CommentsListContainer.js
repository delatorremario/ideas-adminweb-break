import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import moment from 'moment';
import CommentsListComponent from '../../components/comments/CommentsListComponent';
import Comments from '../../../api/comments/comments';

const composer = ({ ideaId, match }, onData) => {
    const sub = Meteor.subscribe('comments.byIdea', ideaId);
    if (sub.ready()) {
        const comments = Comments.find({ ideaId: ideaId }, { sort: { createdAt: 1 } }).fetch();
        onData(null, { comments, ideaId });
    }
};

export default composeWithTracker(composer, Loading)(CommentsListComponent);
