import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import _ from 'lodash';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import rateLimit from '../../modules/rate-limit.js';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Stream } from 'stream';
import Comments, { CommentsSchema } from './comments';
import Vieweds from '../vieweds/vieweds';

export const upsertComment = new ValidatedMethod({
    name: 'comments.upsert',
    validate: CommentsSchema.validator(),
    run(comment) {
        return Comments.upsert({ _id: comment._id }, { $set: comment }, (err, data) => {
            if (err) {
                throw err;
            }
            const viewed = {
                userId: Meteor.userId(),
                commentId: data.insertedId,
                ideaId: comment.ideaId,
                viewedAt: new Date()
            }
            Meteor.call('vieweds.upsert', viewed);
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
    'comments.read': (commentId) => {
        check(commentId, String);
        console.log('method comments.read:', commentId, Meteor.userId());
    }
})
