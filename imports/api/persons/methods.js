import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import _ from 'lodash';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Persons from './persons';
import rateLimit from '../../modules/rate-limit.js';
import Areas from '../areas/areas';
import XLSX from 'xlsx';
import { check } from 'meteor/check';

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

export const joinUserPerson = (user) => {
    console.log('USER', user);
    return `hola ${user._id}`
}

rateLimit({
    methods: [
        upsertPerson,
        removePerson,
    ],
    limit: 5,
    timeRange: 1000,
});

Meteor.methods({
    'persons.view': (_id) => {
        if (!Meteor.isServer) return;
        check(_id, String);
        let person = Persons.findOne(_id);
        person.area = Areas.findOne(person.areaId);
        person.oneUp = Persons.findOne({ masterCode: person.managerCode })
        if (person.oneUp) person.oneUp.area = Areas.findOne(person.oneUp.areaId);
        return person;
    },
    'persons.view.email': (email) => {
        if (!Meteor.isServer) return;
        check(email, String);
        let person = Persons.findOne({ email });
        if (person && person.areaId) person.area = Areas.findOne(person.areaId);
        if (person && person.managerCode) person.oneUp = Persons.findOne({ masterCode: person.managerCode })
        if (person && person.oneUp) person.oneUp.area = person.oneUp && person.oneUp.areaId && Areas.findOne(person.oneUp.areaId);
        return person;
    }
})
