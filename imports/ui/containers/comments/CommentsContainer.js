import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import CommentsPage from '../../pages/comments/CommentsPage';
import moment from 'moment';
import Ideas from '../../../api/ideas/ideas';

const composer = ({ match }, onData) => {
    moment.locale('es');
    const sub = Meteor.subscribe('ideas.state.list', {}, 100);
    if (sub.ready()) {
        const ideas = Ideas.find({},{}).fetch();
        const userId = Meteor.userId();
        console.log(userId, ideas);
        onData(null, { ideas });
    }
};

export default composeWithTracker(composer, Loading)(CommentsPage);
