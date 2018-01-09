import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import _ from 'lodash';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import rateLimit from '../../modules/rate-limit.js';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Stream } from 'stream';
import Comments, { CommentsSchema } from './comments';
import Vieweds from '../vieweds/vieweds';
import Ideas from '../ideas/ideas';

export const upsertComment = new ValidatedMethod({
    name: 'comments.upsert',
    validate: CommentsSchema.validator(),
    run(comment) {
        return Comments.upsert({ _id: comment._id }, { $set: comment }, (err, data) => {
            if (err) {
                throw err;
            }
            const ideaId = comment.ideaId;
            const idea = Ideas.findOne(ideaId);
            const commentId = data.insertedId;
            _.forEach(idea.viewers, viewer => {
                const view = {
                    userId: viewer.userId,
                    commentId: commentId,
                    ideaId: ideaId
                }
                if (viewer.userId === Meteor.userId()) {
                    Meteor.call('vieweds.view', view);
                } else {
                    Meteor.call('vieweds.upsert', view);
                }
            })
        });
    },
});

export const removeComment = new ValidatedMethod({
    name: 'comments.remove',
    validate: new SimpleSchema({
        _id: { type: String },
    }).validator(),
    run({ _id }) {
        Comments.remove(_id);
    },
});


rateLimit({
    methods: [
        upsertComment,
        removeComment,
    ],
    limit: 5,
    timeRange: 1000,
});

Meteor.methods({
    'comments.view': (commentId) => {
        if (!Meteor.isServer) return;
        check(commentId, String);
        const ideaId = Comments.findOne(commentId).ideaId;
        const vieweds = Vieweds.find({
            userId: Meteor.userId(),
            commentId: commentId,
            ideaId: ideaId
        }).fetch();
        _.forEach(vieweds, viewed => {
            Meteor.call('vieweds.view', viewed);
        })
    }
})
