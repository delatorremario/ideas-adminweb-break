import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { check } from 'meteor/check';
import Vieweds from '../vieweds';

Meteor.publish('viewed.byUserId', (userId) => {
    check(userId, String);
    return Vieweds.find({ userId: userId }, { sort: { createdAt: 1 } });
});

Meteor.publish('viewed.byCommentId', (commentId) => {
    check(commentId, String);
    return Vieweds.find({ commentId: commentId }, { sort: { createdAt: 1 } });
});

Meteor.publish('vieweds.quantityNonByUser', () => {
    return Vieweds.find({ userId: Meteor.userId(), viewedAt: null });
});

Meteor.publish('vieweds.quantityNonByUser&Idea', (ideaId) => {
    check(ideaId, String);
    return Vieweds.find({ userId: Meteor.userId(), ideaId: ideaId, viewedAt: null });
});