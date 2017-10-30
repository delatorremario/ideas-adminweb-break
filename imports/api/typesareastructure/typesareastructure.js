import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const TypesAreaStructure = new Mongo.Collection('typesareastructure');
export default TypesAreaStructure;

TypesAreaStructure.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
})

TypesAreaStructure.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
})

TypesAreaStructure.schema = new SimpleSchema({
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

TypesAreaStructure.attachSchema(TypesAreaStructure.schema);
