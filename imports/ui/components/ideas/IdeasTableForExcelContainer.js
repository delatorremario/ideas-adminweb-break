import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import IdeaCard from './IdeaCard';
import IdeasTableForExcel from './IdeasTableForExcel';
import Loading from '../../components/Loading';
import _ from 'lodash';

const composer = ({ ideas }, onData) => {
    const ideasId = _.map(ideas,'_id');

        Meteor.call('getIdeasByIds', ideasId, (err, ideasFull) => {
            if (err) { console.log('err', err); return; }
            onData(null, { ideasFull });
        });
};

export default composeWithTracker(composer, Loading)(IdeasTableForExcel);
