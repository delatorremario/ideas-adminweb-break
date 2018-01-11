import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Loading from '../../components/Loading.js';
import _ from 'lodash';
import moment from 'moment';
import AlertsListComponent from '../../components/alerts/AlertsListComponent';
// import Notifications from '../../../api/notifications/notifications';

const composer = (params, onData) => {
    const { match } = params;
    moment.locale('es');
    const alerts = [
        {
            _id: 'uwe89uwe9we8v',
            state: 'new',
            path: '/ideas/find',
            createdAt: moment().subtract(1, 'days'),
            body: {
                title: 'Aprender a cambiar un foco',
                message: 'Nuevo comentario'
            }
        },
        {
            _id: 'uwe89uwe9we8v ',
            state: 'old',
            path: '/ideas/find',
            createdAt: moment(),
            body: {
                title: 'Aprender a cambiar un foco',
                message: 'Cambio de estado'
            }
        }
    ];
    onData(null, { match, alerts });
}

export default composeWithTracker(composer, Loading)(AlertsListComponent);

// const composer = (params, onData) => {
//     const { match } = params;
//     const subscription = Meteor.subscribe('notifications.listByUserDestination');

//     if (subscription.ready()) {
//         const notifications = Notifications.find({}).fetch()
//         onData(null, { match, notifications })
//     }
// }