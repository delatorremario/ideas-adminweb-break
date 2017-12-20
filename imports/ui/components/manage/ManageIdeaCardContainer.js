import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import _ from 'lodash';

import Files from '../../../api/files/files';


import ManageIdeaCardComponent from './ManageIdeaCardComponent';
import Loading from '../../components/Loading';

const composer = ({ idea, lap, handleRemove, showEdit }, onData) => {

    const subsFiles = Meteor.subscribe('files.list', idea.images || [''])

    if (subsFiles.ready()) {
        Meteor.call('area.get', idea.chief.areaId, (err, area) => {
            if (err) { console.log('err', err); return; }
            idea.area = area;
            const imagesCursor = Files.find({ _id: { $in: idea.images || [] } }).each();
            
            onData(null, { idea, imagesCursor, lap, handleRemove, showEdit });
        });
    }
};

export default composeWithTracker(composer, Loading)(ManageIdeaCardComponent);
