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
    name: {
        type: String
    },
    typeAreaId: {
        type: String, optional: true // Area Operativa o Area Funcional
    },
    typeAreaStructureId: {
        type: String, optional: true // 'Presidencia', 'Vicepresidencia', 'Gerencia General', 'Gerencia', 'SuperIntendencia
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
    corporationId: {
        type: String, optional: true
    },
})

Area.attachSchema(Area.schema);
