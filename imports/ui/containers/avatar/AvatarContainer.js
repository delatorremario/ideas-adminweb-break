import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import AvatarComponent from '../../components/avatar/AvatarComponent';

const composer = ({ }, onData) => {
    let userImg;
    let color = 'red';
    let name = 'Mario de la Torre';
    let email = 'mdelatorre@holos.cl';
    onData(null, { userImg, color, name, email });
};

export default composeWithTracker(composer, Loading)(AvatarComponent);