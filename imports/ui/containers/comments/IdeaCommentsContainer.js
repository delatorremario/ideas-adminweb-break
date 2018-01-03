import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import IdeaCommentsPage from '../../pages/comments/IdeaCommentsPage';
import moment from 'moment';
import Ideas from '../../../api/ideas/ideas';

const composer = ({ match }, onData) => {
    moment.locale('es');
    let id = match.params._id;
    const sub = Meteor.subscribe('ideas.view', id);
    if (sub.ready()) {
        const idea = Ideas.find({ _id: id }, {}).fetch()[0];
        onData(null, { idea });
    }
};

export default composeWithTracker(composer, Loading)(IdeaCommentsPage);