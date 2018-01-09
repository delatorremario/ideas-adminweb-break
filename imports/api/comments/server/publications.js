import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { check } from 'meteor/check';
import Comments from '../comments';

Meteor.publish('comments.byIdea', (ideaId) => {
    check(ideaId, String);
    return Comments.find({ ideaId: ideaId }, { sort: { createdAt: 1 } });
});

Meteor.publish('comments.byId', (id) => {
    check(id, String);
    return Comments.find({ _id: id }, { sort: { createdAt: 1 } });
});
