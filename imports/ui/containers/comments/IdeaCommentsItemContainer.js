import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import { Bert } from 'meteor/themeteorchef:bert';
import IdeaCommentsItemComponent from '../../components/comments/IdeaCommentsItemComponent';
import Vieweds from '../../../api/vieweds/vieweds';

const composer = ({ idea, match, history }, onData) => {
    const sub = Meteor.subscribe('vieweds.quantityNonByUser&Idea', idea._id);
    if (sub.ready()) {
        const nonViewed = Vieweds.find({ userId: Meteor.userId(), ideaId: idea._id }).fetch();
        let cantNVCom = nonViewed.length;
        onData(null, { idea, cantNVCom });
    }
};

export default composeWithTracker(composer, Loading)(IdeaCommentsItemComponent);