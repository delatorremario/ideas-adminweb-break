import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { Roles } from 'meteor/alanning:roles';

import Dashboard from '../../../ui/pages/dashboard/Dashboard';
import Loading from '../../components/Loading';
import { ReactiveVar } from 'meteor/reactive-var';

const days = new ReactiveVar(-1);
const daySpinner = new ReactiveVar(-2);

const composer = ({ match }, onData) => {
    Meteor.call('getDashboard', days.get(), (err, data) => {
        // daySpinner.set(-2)
        onData(null, { data, days, daySpinner });
    })
}

export default composeWithTracker(composer, Loading)(Dashboard);
