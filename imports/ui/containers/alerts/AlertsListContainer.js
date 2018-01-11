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
        let allAlerts = Alerts.find({ usersDestination: Meteor.userId() }, { sort: { createdAt: -1 } }).fetch();
        let alerts = [];
        let newAlerts = [];
        let oldAlerts = [];
        _.forEach(allAlerts, not => {
            if (not.state === "new") {
                newAlerts.push(not)
            } else {
                oldAlerts.push(not)
            }
        })
        newAlerts = _.take(newAlerts, 5);
        alerts = _.concat(newAlerts, oldAlerts);
        onData(null, { match, alerts });
    }
}

export default composeWithTracker(composer, Loading)(AlertsListComponent);