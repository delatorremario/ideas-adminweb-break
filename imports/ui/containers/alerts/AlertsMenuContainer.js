import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import Alerts from '../../../api/alerts/alerts';
import AlertsMenuComponent from '../../components/alerts/AlertsMenuComponent';
import _ from 'lodash';

const composer = ({ }, onData) => {
    const subscription = Meteor.subscribe('alerts.topList', 0);
    if (subscription.ready()) {
        let counter = 0;
        const allAlerts = Alerts.find(
            { usersDestination: Meteor.userId() },
            { sort: { createdAt: -1 }, limit: 0 }
        ).fetch();
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
        alerts = newAlerts;
        if (alerts.length < 5) {
            alerts = _.concat(alerts, _.take(oldAlerts, (5 - alerts.length)));
        }
        counter = newAlerts.length;
        onData(null, { alerts, counter });
    }
};

export default composeWithTracker(composer, Loading)(AlertsMenuComponent);