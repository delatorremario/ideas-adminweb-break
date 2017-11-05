import { Mongo } from 'meteor/mongo';
// import { Factory } from 'meteor/dburles:factory';

import PersonSchema from './personSchema';

const Persons = new Mongo.Collection('persons');
export default Persons

Persons.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
})

Persons.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
})

Persons.attachSchema(PersonSchema);
