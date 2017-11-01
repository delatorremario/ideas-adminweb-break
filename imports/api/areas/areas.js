import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const Areas = new Mongo.Collection('areas');
export default Areas

Areas.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
})

Areas.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
})

Areas.schema = new SimpleSchema({
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
        type: String
    },
})

Areas.attachSchema(Areas.schema);
