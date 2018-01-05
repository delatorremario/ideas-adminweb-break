import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import AvatarComponent from '../../components/avatar/AvatarComponent';
import Files from '../../../api/files/files';

const composer = ({ userId }, onData) => {
    const sub = Meteor.subscribe('user.profile', userId);
    if (sub.ready()) {
        const user = Meteor.users.findOne({ _id: userId });
        const imageId = user && user.profile && user.profile.imageId || '';
        const subsFiles = Meteor.subscribe('files.list', [imageId]);
        if (subsFiles.ready()) {
            const userImg = Files.findOne({ _id: imageId });
            const name = user.profile && (user.profile.firstName + ' ' + user.profile.lastName) || user.emails[0].address || _.last(user.emails).address;
            const color = (user.profile && user.profile.color) || '#337ab7';
            const email = _.last(user.emails).address;
            onData(null, { userImg, color, name, email });
        }
    }
};

export default composeWithTracker(composer, Loading)(AvatarComponent);