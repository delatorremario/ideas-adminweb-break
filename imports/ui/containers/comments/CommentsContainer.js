import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import CommentsPage from '../../pages/comments/CommentsPage';
import moment from 'moment';

const composer = ({ match }, onData) => {
    moment.locale('es');
    let comment1 = 'A mi me parece que lo que vos pedís no tiene sentido alguno.',
        comment2 = 'Cuando será el día que dejes de tirar ideas inútiles vieja? Cambiá la actitud!',
        comment3 = 'Hola comment 3', comment4 = 'Hola comment 4',
        viewer1 = { userId: '1', viewedAt: new Date }, viewer2 = { userId: '2', viewedAt: new Date },
        viewer3 = { userId: '3' }, viewer4 = { userId: '4', viewedAt: new Date };
    let ideas = [
        {
            _id: '9283472234',
            createdAt: moment(),
            opportunity: 'Cambiemos',
            viewers: [viewer1, viewer2, viewer4],
            comments: [
                {
                    userId: '1',
                    createdAt: moment(),
                    text: comment1,
                    viewers: [viewer1, viewer2]
                },
                {
                    userId: '4',
                    createdAt: moment(),
                    text: comment2,
                    viewers: [viewer1, viewer2, viewer4]
                },
                {
                    userId: '1',
                    createdAt: moment(),
                    text: comment3,
                    viewers: [viewer1, viewer2, viewer4]
                }
            ]
        },
        {
            _i: '29374289374',
            createdAt: moment(),
            opportunity: 'Frente para la victoria',
            viewers: [viewer3, viewer4],
            comments: [
                {
                    userId: '2',
                    createdAt: moment(),
                    text: comment2,
                    viewers: [viewer3, viewer4]
                },
                {
                    userId: '3',
                    createdAt: moment(),
                    text: comment4,
                    viewers: [viewer3, viewer4]
                }
            ]
        }
    ]
    onData(null, { ideas });
};

export default composeWithTracker(composer, Loading)(CommentsPage);
