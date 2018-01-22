import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { Roles } from 'meteor/alanning:roles';

import Dashboard from '../../../ui/pages/dashboard/Dashboard';
import Loading from '../../components/Loading';

const days = new ReactiveVar(-1)

const composer = ({ match }, onData) => {
    Meteor.call('getDashboard', days.get(), (err, data) => {
        onData(null, { data, days });
    })
}

export default composeWithTracker(composer, Loading)(Dashboard);
