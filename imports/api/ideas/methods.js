import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import _ from 'lodash';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Ideas from './ideas';
import rateLimit from '../../modules/rate-limit.js';
import PersonSchema from '../../api/persons/personSchema';
import IdeasStatesSchemas from '../ideasStatesSchema/ideasStatesSchema';


export const upsertIdea = new ValidatedMethod({
    name: 'ideas.upsert',
    validate: new SimpleSchema({

        _id: { type: String, optional: true },
        userId: { type: String, optional: true },
        corporationId: { type: String, optional: true },
        createdAt: { type: Date, optional: true },
        date: { type: Date },
        origin: { type: String },
        person: { type: PersonSchema },
        chief: { type: PersonSchema },
        description: { type: String },
        opportunity: { type: String },
        drivers: { type: [String] },
        collaborators: { type: [PersonSchema], optional: true },
        states: { type: [IdeasStatesSchemas], optional: true },

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

Meteor.methods({
    'getIdeasByIds': (ids) => {
        check(ids, [String]);
        if (!Meteor.isServer) return;
        return Ideas.aggregate([
            { $match: { _id: { $in: ids } } },
            { $lookup: { from: 'areas', foreignField: '_id', localField: 'chief.areaId', as: 'destinationarea' } },
            { $unwind: '$destinationarea' },
            { $lookup: { from: 'areas', foreignField: '_id', localField: 'person.areaId', as: 'personarea' } },
            { $unwind: '$personarea' },
            { $sort: { date: 1 } },
        ]);
    }
})