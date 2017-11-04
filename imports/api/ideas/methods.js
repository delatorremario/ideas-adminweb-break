import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import _ from 'lodash';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Ideas from './ideas';
import rateLimit from '../../modules/rate-limit.js';

export const upsertIdea = new ValidatedMethod({
    name: 'ideas.upsert',
    validate: new SimpleSchema({
        _id: { type: String, optional: true },
        origin: { type: String },
        description: { type: String },
    }).validator(),
    run(idea) {
        return Ideas.upsert({ _id: idea._id }, { $set: idea });
    },
});

export const removeIdea = new ValidatedMethod({
    name: 'ideas.remove',
    validate: new SimpleSchema({
        _id: { type: String },
    }).validator(),
    run({ _id }) {
        Ideas.remove(_id);
    },
});

rateLimit({
    methods: [
        upsertIdea,
        removeIdea,
    ],
    limit: 5,
    timeRange: 1000,
});



