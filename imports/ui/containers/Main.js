import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import MainWrapper from '../layouts/MainWrapper';
import Loading from '../components/Loading.js';

const composer = ({ match }, onData) => {
    const user = Meteor.user();
    if (user) {
        onData(null, { user });
    }
};

export default composeWithTracker(composer, Loading)(MainWrapper);
