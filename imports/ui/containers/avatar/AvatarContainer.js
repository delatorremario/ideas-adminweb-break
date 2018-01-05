import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import AvatarComponent from '../../components/avatar/AvatarComponent';

const composer = ({ }, onData) => {
    let user = Meteor.user();
    console.log(user);
    let userImg;
    let color = (user.profile && user.profile.color) || '#337ab7';
    let name = (user.profile && (user.profile.firstName + ' ' + user.profile.lastName)) || 'I';
    let email = user.emails[0].address;
    onData(null, { userImg, color, name, email });
};

export default composeWithTracker(composer, Loading)(AvatarComponent);