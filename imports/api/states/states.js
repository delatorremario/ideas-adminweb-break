import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const AlertSchema = new SimpleSchema({
    temporal: { type: Boolean },
    stateChange: { type: Boolean, optional: true, defaultValue: false },
    delay: { type: Number, optional: true, defaultValue: 1 },
    daily: { type: Boolean, optional: true, defaultValue: false },
    weekly: { type: Boolean, optional: true, defaultValue: false },
    sendEmail: { type: Boolean, defaultValue: true },
    sendInbox: { type: Boolean },
    employee: { type: Boolean },
    lead: { type: Boolean, defaultValue: true },
    oneUp: { type: Boolean },
    chief: { type: Boolean },
    message: { type: String, optional: true },
})

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

const NextSchema = new SimpleSchema({
    title: { type: String, optional: true },
    code: { type: String, optional: true },
    color: { type: String, optional: true },
    action: { type: String, optional: true },
})
const toChangeSchema = new SimpleSchema({
    text: { type: Boolean, optional: true },
    label: { type: String, optional: true },
    value: { type: String, optional: true },
})

States.schema = new SimpleSchema(
    {
        _id: { type: String, optional: true },
        corporationId: { type: String, optional: true },
        userId: { type: String, optional: true },
        createdAt: { type: Date, optional: true },
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
        green: { type: Number, optional: true, defaultValue: 1, min: 0 },
        yellow: { type: Number, optional: true, defaultValue: 2, min: 0 },

        alerts: { type: [AlertSchema], optional: true },
        title: { type: String, optional: true },
        roles: { type: [String], optional: true },
        nexts: { type: [NextSchema], optional: true },
        toChanges: { type: [toChangeSchema], optional: true },
        action: { type: String, optional: true },
    },
)

States.attachSchema(States.schema);

