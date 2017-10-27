import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const TypesAreas = new Mongo.Collection('typesareas');
export default TypesAreas;

TypesAreas.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
})

TypesAreas.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
})

TypesAreas.schema = new SimpleSchema({
    name: {
        type: String
    },
    order: {
        type: Number
    },
    corporationId : {
        type: String
    },
})

TypesAreas.attachSchema(TypesAreas.schema);
