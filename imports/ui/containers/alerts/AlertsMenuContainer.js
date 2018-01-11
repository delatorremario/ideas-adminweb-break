import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import AlertsMenuComponent from '../../components/alerts/AlertsMenuComponent';
import moment from 'moment';
// import Alerts from '../../../api/alerts/Alerts';

const composer = ({ }, onData) => {
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
    const counter = alerts.length;
    onData(null, { alerts, counter });
};

export default composeWithTracker(composer, Loading)(AlertsMenuComponent);

// const composer = ({ }, onData) => {
//     const subscription = Meteor.subscribe('notifications.topList', 10);

//     if (subscription.ready()) {
//         const notifications = Notifications.find({}).fetch();
//         newNotifications = [];

//         notifications.map(not => {
//             if (not.state === "new") newNotifications.push(not);
//         })
        
//         counter = newNotifications.length
//         onData(null, { notifications, counter });
//     }
// };