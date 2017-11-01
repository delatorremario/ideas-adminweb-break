import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import _ from 'lodash';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Persons from './persons';
import rateLimit from '../../modules/rate-limit.js';

export const upsertPerson = new ValidatedMethod({
    name: 'persons.upsert',
    validate: new SimpleSchema({
        _id: { type: String, optional: true },
        name: { type: String, optional: true },
    }).validator(),
    run(person) {
        return Persons.upsert({ _id: person._id }, { $set: person });
    },
});

export const removePerson = new ValidatedMethod({
    name: 'persons.remove',
    validate: new SimpleSchema({
        _id: { type: String },
    }).validator(),
    run({ _id }) {
        Persons.remove(_id);
    },
});

rateLimit({
    methods: [
        upsertPerson,
        removePerson,
    ],
    limit: 5,
    timeRange: 1000,
});



