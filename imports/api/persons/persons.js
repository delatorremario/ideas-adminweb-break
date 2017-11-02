import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

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

Persons.schema = new SimpleSchema({
    firstName: {
        type: String
    },
    secondName: {
        type: String, optional: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String, unique: true
    },
    areaId: {
        type: String, optional: true
    },
    masterArea: {
        type: String, optional: true
    },
    corporationId: {
        type: String
    },
})

Persons.attachSchema(Persons.schema);
