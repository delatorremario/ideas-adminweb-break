import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import AreasPage from '../../pages/areas/AreasPage'

const composer = (props, onData) => {
    onData(null, props);
};

export default composeWithTracker(composer, Loading)(AreasPage);
