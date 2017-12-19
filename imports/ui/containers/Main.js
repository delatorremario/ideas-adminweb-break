import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import MainWrapper from '../layouts/MainWrapper';
import Loading from '../components/Loading.js';
import Files from '../../api/files/files';

const composer = ({ match }, onData) => {
    const user = Meteor.user();
    const imageId = user && user.profile && user.profile.imageId || '';
    const subsFiles = Meteor.subscribe('files.list', [imageId]);

    if (user && subsFiles.ready()) {
        const userImg = Files.findOne({_id:imageId});
        onData(null, { user, userImg });
    }
};

export default composeWithTracker(composer, Loading)(MainWrapper);
