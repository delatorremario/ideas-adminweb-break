import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import IdeaCard from './IdeaCard';
import Loading from '../../components/Loading';
import _ from 'lodash';

const composer = ({ idea, lap, handleRemove }, onData) => {

    Meteor.call('area.get', idea.chief.areaId, (err, area) => {
        if (err) { console.log('err', err); return; }
        idea.area = area;
        onData(null, { idea, lap, handleRemove });
    });
};

export default composeWithTracker(composer, Loading)(IdeaCard);
