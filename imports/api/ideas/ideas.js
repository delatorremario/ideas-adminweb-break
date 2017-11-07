import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import BaseSchema from '../base/baseSchema';
import PersonSchema from '../persons/personSchema';

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
    BaseSchema,
    { date: { type: Date } },
    { origin: { type: String } },
    { person: { type: PersonSchema } },
    { chief: { type: PersonSchema } },
    { description: { type: String } },
    { opportunity: { type: String } },
    { drivers: { type: [String] } },
    { collaborators: { type: [PersonSchema], optional: true } },
]);

Ideas.attachSchema(Ideas.schema);
