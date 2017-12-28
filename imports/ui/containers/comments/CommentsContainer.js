import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import CommentsPage from '../../pages/comments/CommentsPage';
import moment from 'moment';

const composer = ({ match }, onData) => {
    moment.locale('es');
    let comment1 = 'Me parece que lo que pides tiene mucho sentido',
        comment2 = 'Puede ser factible',
        comment3 = 'Hola comment 3', comment4 = 'Hola comment 4',
        viewer1 = { userId: '1', view: true }, viewer2 = { userId: '2', view: false },
        viewer3 = { userId: '3', view: true }, viewer4 = { userId: '4', view: true };
    let ideas = [
        {
            createdAt: moment(),
            opportunity: 'Instalar Wifi en los baños',
            comments: [
                {
                    userId: '1',
                    user: {
                        firstName: 'Carlos'
                    },
                    createdAt: moment(),
                    comment: comment1,
                    viewers: [viewer1, viewer2]
                },
                {
                    userId: '4',
                    user: {
                        firstName: 'Pepe'
                    },
                    createdAt: moment(),
                    comment: comment2,
                    viewers: [viewer1, viewer2, viewer4]
                }
            ]
        },
        {
            createdAt: moment(),
            opportunity: 'Colocar pasto sintético',
            comments: [
                {
                    userId: '2',
                    user: {
                        firstName: 'Mario'
                    },
                    comment: comment2,
                    viewers: [viewer3, viewer4]
                },
                {
                    userId: '3',
                    user: {
                        firstName: 'Fede'
                    },
                    comment: comment4,
                    viewers: [viewer3, viewer4]
                }
            ]
        }
    ]
    onData(null, { ideas });
};

export default composeWithTracker(composer, Loading)(CommentsPage);
