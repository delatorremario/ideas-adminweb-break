import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import AlertsComponent from '../../components/alerts/AlertsComponent';
import moment from 'moment';

const composer = ({ }, onData) => {
    moment.locale('es');
    const notifications = [
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
            state: 'new',
            path: '/ideas/find',
            createdAt: moment(),
            body: {
                title: 'Aprender a cambiar un foco',
                message: 'Cambio de estado'
            }
        }
    ];
    const counter = notifications.length;
    onData(null, { notifications, counter });
};

export default composeWithTracker(composer, Loading)(AlertsComponent);
