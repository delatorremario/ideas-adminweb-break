import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import AlertsPage from '../../pages/alerts/AlertsPage';

const composer = ({ }, onData) => {
    onData(null, {});
};

export default composeWithTracker(composer, Loading)(AlertsPage);