import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import _ from 'lodash';

import Files from '../../../api/files/files';


import IdeaCard from './IdeaCard';
import Loading from '../../components/Loading';

const composer = ({ idea, lap, handleRemove, showEdit, showNext }, onData) => {

    const subsFiles = Meteor.subscribe('files.list', idea.images || [''])

    if (subsFiles.ready()) {
        Meteor.call('area.get', idea.chief.areaId, (err, area) => {
            if (err) { console.log('err', err); return; }
            idea.area = area;
            const imagesCursor = Files.find({ _id: { $in: idea.images || [] } }).each();
            if (showNext) {
                const lastState = _.last(idea.states);
                console.log('__LAST__', lastState);
            }

            onData(null, { idea, imagesCursor, lap, handleRemove, showEdit, showNext });
        });
    }
};

export default composeWithTracker(composer, Loading)(IdeaCard);
