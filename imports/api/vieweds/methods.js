import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import _ from 'lodash';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import rateLimit from '../../modules/rate-limit.js';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Stream } from 'stream';
import Vieweds, { ViewedsSchema } from './vieweds';

export const upsertViewed = new ValidatedMethod({
    name: 'vieweds.upsert',
    validate: ViewedsSchema.validator(),
    run(viewed) {
        return Vieweds.upsert({ _id: viewed._id }, { $set: viewed });
    },
});

export const removeViewed = new ValidatedMethod({
    name: 'vieweds.remove',
    validate: new SimpleSchema({
        _id: { type: String },
    }).validator(),
    run({ _id }) {
        Vieweds.remove(_id);
    },
});


rateLimit({
    methods: [
        upsertViewed,
        removeViewed,
    ],
    limit: 5,
    timeRange: 1000,
});

Meteor.methods({
    'vieweds.view': (view) => {
        if (!Meteor.isServer) return;
        check(view, ViewedsSchema);
        if (view.viewedAt === undefined) {
            console.log('View');
            view.viewedAt = new Date();
            Meteor.call('vieweds.upsert', view);
        }
    },
    'vieweds.quantityByUser': () => {},
    'vieweds.quantityByUser&Idea': (ideaId) => {}
})
