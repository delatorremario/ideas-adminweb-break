import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Alerts from './alerts';
import rateLimit from '../../modules/rate-limit.js';

export const upsertAlert = new ValidatedMethod({
    name: 'alerts.upsert',
    validate: Alerts.schema.validator(),
    run(alert) {
        return Alerts.upsert({ _id: alert._id }, { $set: alert });
    },
});

export const setAlertOpened = new ValidatedMethod({
    name: 'alerts.setOpened',
    validate: new SimpleSchema({
        _id: { type: String, optional: true },
        createdAt: { type: Date, optional: true },
        userOwner: { type: String, optional: true },
        type: { type: String, optional: true },
        usersDestination: { type: [String], optional: true },
        state: { type: String, optional: true },
        "body.title": { type: String, optional: true },
        "body.message": { type: String, optional: true },
        path: { type: String, optional: true }
    }).validator(),
    run(alert) {
        return Alerts.update({ _id: alert._id }, { $set: { state: 'opened' } });
    },
});

export const removeAlert = new ValidatedMethod({
    name: 'alerts.remove',
    validate: new SimpleSchema({
        _id: { type: String },
    }).validator(),
    run({ _id }) {
        Alerts.remove(_id);
    },
});

rateLimit({
    methods: [
        upsertAlert,
        removeAlert,
    ],
    limit: 5,
    timeRange: 1000,
});