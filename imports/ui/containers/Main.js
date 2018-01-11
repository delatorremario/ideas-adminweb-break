import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import MainWrapper from '../layouts/MainWrapper';
import Loading from '../components/Loading.js';
import Files from '../../api/files/files';
import Areas from '../../api/areas/areas';

const composer = ({ match }, onData) => {
    const user = Meteor.user();
    const imageId = user && user.profile && user.profile.imageId || '';
    const subsFiles = Meteor.subscribe('files.list', [imageId]);
    const subsAreas = Meteor.subscribe('areas.view', user && user.profile && user.profile.areaId || '')

    if (user && subsFiles.ready() && subsAreas.ready()) {
        const userImg = Files.findOne({ _id: imageId });
        const area = Areas.findOne({ _id: user && user.profile && user.profile.areaId })
        console.log('--- area ----', area);
        _.extend(user, { area })
        onData(null, { user, userImg });
    }
};

export default composeWithTracker(composer, Loading)(MainWrapper);
