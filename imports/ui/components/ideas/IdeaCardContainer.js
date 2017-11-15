import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import IdeaCard from './IdeaCard';
import Loading from '../../components/Loading';

const composer = ({ idea, lap, handleRemove }, onData) => {

    Meteor.call('area.get', idea.chief.areaId, (err, area) => {
        _.extend(idea, { area });
        onData(null, { idea, lap, handleRemove });
    });
};

export default composeWithTracker(composer, Loading)(IdeaCard);
