import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { Factory } from 'meteor/dburles:factory'

const Corporations = new Mongo.Collection('corporations')
export default Corporations

Corporations.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
})

Corporations.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
})

Corporations.schema = new SimpleSchema({
    name: {
        type: String
    },
    adminsEmails: {
        type: [String]
    },
})

Corporations.attachSchema(Corporations.schema)