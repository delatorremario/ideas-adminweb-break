import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const States = new Mongo.Collection('states');
export default States

States.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
})

States.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
})

States.schema = new SimpleSchema(
    {
        _id: { type: String, optional: true },
        corporationId: { type: String, optional: true },
        userId: { type: String },
        createdAt: { type: Date },
        updatedAt: {
            type: Date,
            index: true,
            autoValue: function () {
                if (this.isUpdate) return new Date
            },
            denyInsert: true,
            optional: true,

        },
        code: { type: String },
        step: { type: String },
        state: { type: String },
        description: { type: String },
        color: { type: String },
        showInDashboard: { type: Boolean, optional: true },
        config: { type: [Object], optional: true },
        green: { type: Number, optional: true, defaultValue: 0 },
        yellow: { type: Number, optional: true, defaultValue: 0 },

        'alerts': { type: Array, optional: true },
        'alerts.$': { type: Object, optional: true },
        'alerts.$.temporal': { type: Boolean },
        'alerts.$.stateChange': { type: Boolean, optional: true, defaultValue: false },
        'alerts.$.delay': { type: Number, optional: true, defaultValue: 1 },
        'alerts.$.daily': { type: Boolean, optional: true, defaultValue: false },
        'alerts.$.weekly': { type: Boolean, optional: true, defaultValue: false },
        'alerts.$.sendEmail': { type: Boolean },
        'alerts.$.sendInbox': { type: Boolean },
        'alerts.$.employee': { type: Boolean },
        'alerts.$.lead': { type: Boolean },
        'alerts.$.oneUp': { type: Boolean },
        'alerts.$.message': { type: String, optional: true },


    },
)

States.attachSchema(States.schema);
