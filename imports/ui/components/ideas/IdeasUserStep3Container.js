import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import _ from 'lodash';

import Files from '../../../api/files/files';
import IdeasUserStep3 from '../../components/ideas/IdeasUserStep3';
import Loading from '../../components/Loading';

const composer = ({ imagesIds, attachImage, removeImage }, onData) => {
    const subsFiles = Meteor.subscribe('files.list', imagesIds || [])
    if (subsFiles.ready()) {
        const images = Files.find({ _id: { $in: imagesIds || [] } }).each();
        onData(null, { images, attachImage, removeImage });
    }
};

export default composeWithTracker(composer, Loading)(IdeasUserStep3);
