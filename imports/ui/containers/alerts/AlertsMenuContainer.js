import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import Alerts from '../../../api/alerts/alerts';
import AlertsMenuComponent from '../../components/alerts/AlertsMenuComponent';

const composer = ({ }, onData) => {
    const subscription = Meteor.subscribe('alerts.topList', 10);
    if (subscription.ready()) {
        const alerts = Alerts.find({}).fetch();
        newAlerts = [];
        alerts.map(not => {
            if (not.state === "new") newAlerts.push(not);
        })
        counter = newAlerts.length
        onData(null, { alerts, counter });
    }
};

export default composeWithTracker(composer, Loading)(AlertsMenuComponent);