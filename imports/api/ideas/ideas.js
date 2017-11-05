import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import Base from '../base/base';
import Persons from '../persons/persons';

const Ideas = new Mongo.Collection('ideas');
export default Ideas;

Ideas.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
})

Ideas.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
})

Ideas.schema = new SimpleSchema([
    Base,
    { origin: { type: String } },
    { person: { type: Object } },
    { chief: { type: Object } },
    { description: { type: String } },
    { opportunity: { type: String } },
    { 'drivers.$': { type: String } },
    { 'collaborators.$': { type: Object, optional: true } },
]);

Ideas.attachSchema(Ideas.schema);
