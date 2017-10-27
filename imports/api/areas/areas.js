import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const Area = new Mongo.Collection('area');
export default Area

Area.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
})

Area.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
})

Area.schema = new SimpleSchema({
    tipo: {
        type: String, optional: true
    },
    name: {
        type: String, optional: true
    },
    parentAreaId: {
        type: String, optional: true
    },
    masterDataMatchText: {
        type: String, optional: true
    },
    responsableId: {
        type: String, optional: true
    },
})

Area.attachSchema(Area.schema);
