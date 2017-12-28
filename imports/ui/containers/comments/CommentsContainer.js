import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import CommentsPage from '../../pages/comments/CommentsPage';
import moment from 'moment';

const composer = ({ match }, onData) => {
    moment.locale('es');
    let comment1 = 'Me parece que lo que pides tiene mucho sentido',
        comment2 = 'Puede ser factible',
        comment3 = 'Muy buena idea!', comment4 = 'Creo que habría que reveerlo...',
        viewer1 = { userId: '1', viewedAt: new Date }, viewer2 = { userId: '2', viewedAt: new Date },
        viewer3 = { userId: '3' }, viewer4 = { userId: '4', viewedAt: new Date };
    let ideas = [
        {
            _id: '9283472234',
            createdAt: moment(),
            opportunity: 'Instalar Wifi en los baños',
            comments: [
                {
                    userId: 'cxa2qDGNdJcin8rvx',
                    createdAt: moment(),
                    text: comment1,
                    viewers: [viewer1, viewer2]
                },
                {
                    userId: 'cxa2qDGNdJcin8rvx',
                    createdAt: moment(),
                    text: comment2,
                    viewers: [viewer1, viewer2, viewer4]
                },
                {
                    userId: 'cxa2qDGNdJcin8rvx',
                    createdAt: moment(),
                    text: comment3,
                    viewers: [viewer1, viewer2, viewer4]
                },
                {
                    userId: 'cxa2qDGNdJcin8rvx',
                    createdAt: moment(),
                    text: comment4,
                    viewers: [viewer1, viewer2, viewer4]
                }
            ]
        },
        {
            _i: '29374289374',
            createdAt: moment(),
            opportunity: 'Colocar pasto sintético',
            comments: [
                // {
                //     userId: 'cxa2qDGNdJcin8rvx',
                //     createdAt: moment(),
                //     text: comment2,
                //     viewers: [viewer3, viewer4]
                // },
                // {
                //     userId: 'cxa2qDGNdJcin8rvx',
                //     createdAt: moment(),
                //     text: comment4,
                //     viewers: [viewer3, viewer4]
                // }
            ]
        }
    ]
    onData(null, { ideas });
};

export default composeWithTracker(composer, Loading)(CommentsPage);
