import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import CommentsPage from '../../pages/comments/CommentsPage';

const composer = ({ match }, onData) => {
    let comment1 = 'Hola comment 1', comment2 = 'Hola comment 2'
        comment3 = 'Hola comment 3', comment4 = 'Hola comment 4',
        viewer1 = {userId: '1', view: true}, viewer2 = {userId: '2', view: true},
        viewer3 = {userId: '3', view: false}, viewer4 = {userId: '4', view: true};
    let ideas = [
        {
            person: {
                firstName: 'George'
            },
            comments: [
                {
                    userId: '1',
                    comment: comment1,
                    viewers: [viewer1, viewer2]
                },
                {
                    userId: '4',
                    comment: comment3,
                    viewers: [viewer1, viewer2, viewer4]
                }
            ]
        },
        {
            person: {
                firstName: 'Lucas'
            },
            comments: [
                {
                    userId: '2',
                    comment: comment2,
                    viewers: [viewer3, viewer4]
                },
                {
                    userId: '3',
                    comment: comment4,
                    viewers: [viewer3, viewer4]
                }
            ]
        }
    ]
    onData(null, { ideas });
};

export default composeWithTracker(composer, Loading)(CommentsPage);
