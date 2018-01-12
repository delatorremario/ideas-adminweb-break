import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import Alerts from '../../../api/alerts/alerts';
import AlertsMenuComponent from '../../components/alerts/AlertsMenuComponent';
import _ from 'lodash';

const composer = ({ history }, onData) => {
    const subscription = Meteor.subscribe('alerts.topList', 0);
    if (subscription.ready()) {
        let counter = 0;
        const alerts = Alerts.find(
            { usersDestination: Meteor.userId() },
            { sort: { createdAt: -1 }, limit: 0 }
        ).fetch();
        let newAlerts = [];
        _.forEach(alerts, not => {
            if (not.state === "new") {
                newAlerts.push(not)
            }
        })
        counter = newAlerts.length;
        alerts = _.take(alerts, 5);
        onData(null, { alerts, counter, history });
    }
};

export default composeWithTracker(composer, Loading)(AlertsMenuComponent);