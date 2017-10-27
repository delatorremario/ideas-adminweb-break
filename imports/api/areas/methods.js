import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Areas from './areas';
import rateLimit from '../../modules/rate-limit.js';

export const upsertArea = new ValidatedMethod({
    name: 'areas.upsert',
    // validate:  new SimpleSchema({
    //     _id: { type: String, optional: true },
    //     name: { type: String, optional: true },
    //     adminsEmails: { type: [String], optional: true },
    //   }).validator(),
    run(area) {
        return Areas.upsert({ _id: area._id }, { $set: area });
    },
});

export const removeArea = new ValidatedMethod({
    name: 'areas.remove',
    validate: new SimpleSchema({
        _id: { type: String },
    }).validator(),
    run({ _id }) {
        Areas.remove(_id);
    },
});

rateLimit({
    methods: [
        upsertArea,
        removeArea,
    ],
    limit: 5,
    timeRange: 1000,
});