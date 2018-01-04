import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import IdeaCommentsPage from '../../pages/comments/IdeaCommentsPage';
import moment from 'moment';
import Ideas from '../../../api/ideas/ideas';
import { Bert } from 'meteor/themeteorchef:bert';

const composer = ({ match, history }, onData) => {
    moment.locale('es');
    let id = match.params._id;
    const sub = Meteor.subscribe('ideas.view', id);
    if (sub.ready()) {
        const idea = Ideas.find({ _id: id }, {}).fetch()[0];
        const userId = Meteor.userId();
        if (!idea) {
            Bert.alert('No se encontró la idea.', 'danger');
            history.goBack();
        }
        if (_.filter(idea.viewers, v => v.userId === userId).length < 1) {
            Bert.alert('Usted no está asociado a esta idea.', 'warning');
            history.goBack();
        }
        onData(null, { idea });
    }
};

export default composeWithTracker(composer, Loading)(IdeaCommentsPage);