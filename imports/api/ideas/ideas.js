import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import Base from '../base/base';

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


    // firstName: {
    //     type: String
    // },
    // secondName: {
    //     type: String, optional: true
    // },
    // lastName: {
    //     type: String
    // },
    // email: {
    //     type: String, unique: true
    // },
    // rut: {
    //     type: String, optional: true
    // },
    // oneUp: {
    //     type: String, optional: true
    // },
    // areaId: {
    //     type: String, optional: true
    // },
    // masterArea: {
    //     type: String, optional: true
    // },
    // corporationId: {
    //     type: String
    // },
]);

Ideas.attachSchema(Ideas.schema);
