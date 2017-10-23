import { composeWithTracker } from 'react-komposer'
import { Meteor } from 'meteor/meteor'
import Corporations from '../../../api/corporations/corporations'
import CorporationsList from '../../components/corporations/CorporationList';
import Loading from '../../components/Loading.js';

const composer = (params, onData) => {
    const subscription = Meteor.subscribe('corporations.list')
    if(subscription.ready()) {
        const corporations = Corporations.find({ }, { sort: { name: 1 } }).fetch()
        onData(null, { corporations })
    }
}

export default composeWithTracker(composer, Loading)(CorporationsList);