import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Loading from '../../components/Loading.js';
import _ from 'lodash';
import Alerts from '../../../api/alerts/alerts';
import AlertsListComponent from '../../components/alerts/AlertsListComponent';

const composer = (params, onData) => {
    const { match } = params;
    const sub = Meteor.subscribe('alerts.listByUserDestination');
    if (sub.ready()) {
        const alerts = Alerts.find({ usersDestination: Meteor.userId() }, { sort: { createdAt: -1 } }).fetch();
        onData(null, { match, alerts });
    }
}

export default composeWithTracker(composer, Loading)(AlertsListComponent);