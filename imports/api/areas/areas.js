import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import BaseSchema from '../../api/base/baseSchema';

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

Areas.schema = new SimpleSchema([
    BaseSchema,
    {
        name: {
            type: String
        }
    },
    {
        code: {
            type: String
        }
    },
   
    {
        typeAreaId: {
            type: String, optional: true // Area Operativa o Area Funcional
        }
    },
    {
        typeAreaStructureId: {
            type: String, optional: true // 'Presidencia', 'Vicepresidencia', 'Gerencia General', 'Gerencia', 'SuperIntendencia
        }
    },
 
    {
        parentAreaId: {
            type: String, optional: true
        }
    },
    {
        corporationId: {
            type: String
        }
    },
    {
        dashboard: {
            type: Boolean, optional: true, defaultValue: false,
        }
    },
    { family: { type: [String], optional: true } },
    {
        masterType: {
            type: String, optional: true // 'Presidencia', 'Vicepresidencia', 'Gerencia General', 'Gerencia', 'SuperIntendencia
        }
    },
    {
        masterParentCode: {
            type: String, optional: true 
        }
    },
])

Areas.attachSchema(Areas.schema);
