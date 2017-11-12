import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Areas from '../../../api/areas/areas';
import IdeaCard from './IdeaCard';
import Loading from '../../components/Loading';

const composer = ({ idea, lap, handleRemove }, onData) => {
   
    const areasubs = Meteor.subscribe('areas.view', idea.chief.areaId);

    if (areasubs.ready()) {
        const area = Areas.findOne({ _id: idea.chief.areaId });
        _.extend(idea, { area });
        onData(null, { idea, lap, handleRemove });
    }
};

export default composeWithTracker(composer, Loading)(IdeaCard);
