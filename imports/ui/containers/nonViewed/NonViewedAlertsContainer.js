import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import _ from 'lodash';
import Loading from '../../components/Loading.js';
import Vieweds from '../../../api/vieweds/vieweds';
import Alerts from '../../../api/alerts/alerts';
import NonViewedAlertsComponent from '../../components/nonViewed/NonViewedAlertsComponent';

const composer = ({ }, onData) => {
    const sub = Meteor.subscribe('alerts.topList', 0);
    if (sub.ready()) {
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
        const counter = newAlerts.length;
        onData(null, { counter });
    }
};

export default composeWithTracker(composer, Loading)(NonViewedAlertsComponent);
