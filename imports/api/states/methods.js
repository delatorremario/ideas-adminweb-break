import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import _ from 'lodash';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import States from './states';
import rateLimit from '../../modules/rate-limit.js';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

export const upsertState = new ValidatedMethod({
    name: 'state.upsert',
    validate: new SimpleSchema({
        _id: { type: String, optional: true },
        config: { type: [Object], optional: true },
    }).validator(),
    run(state) {
        return States.upsert({ _id: state._id }, { $set: state });
    },
});

export const removeState = new ValidatedMethod({
    name: 'states.remove',
    validate: new SimpleSchema({
        _id: { type: String },
    }).validator(),
    run({ _id }) {
        States.remove(_id);
    },
});


rateLimit({
    methods: [
        upsertState,
        removeState,
    ],
    limit: 5,
    timeRange: 1000,
});

Meteor.methods({
    'state.showInDashboard': (_id, showInDashboard) => {
        check(_id, String);
        check(showInDashboard, Boolean);

        States.update({ _id }, { $set: { showInDashboard } })
    },
    'state.semaphore': (_id, green, yellow) => {
        check(_id, String);
        check(green, Number);
        check(yellow, Number);

        States.update({ _id }, { $set: { green, yellow } })

    },
    'state.addAlert': (_id) => {
        check(_id, String);

        const alert = {
            temporal: false,
            stateChange: false,
            delay: 1,
            daily: false,
            weekly: false,
            sendEmail: false,
            sendInbox: false,
            employee: false,
            lead: false,
            oneUp: false,
            message: '',
        }

        States.update({ _id }, { $push: { alerts: alert } }, (err, data) => console.log('result add alert', err, data))

    },

    'state.saveAlert': (_id, index, alert) => {
        console.log('ALERT', _id, index, alert);
        check(_id, String);
        check(index, Number);
        check(alert, {
            temporal: Boolean,
            stateChange: Boolean,
            delay: Match.Maybe(Number),
            daily: Match.Maybe(Boolean),
            weekly: Match.Maybe(Boolean),
            sendEmail: Boolean,
            sendInbox: Boolean,
            employee: Boolean,
            lead: Boolean,
            oneUp: Boolean,
            chief: Boolean,
            message: String,
        });

        const set = { [`alerts.${index}`]: alert }
        console.log('SET', set);
        States.update({ _id }, { $set: set }, (err, data) => console.log('result data', err, data))
    },
    'state.removeAlert': (_id, index) => {
        if(Meteor.isClient) return;
        check(_id, String);
        check(index, Number);

        const set = { [`alerts.${index}`]: 1 }
        console.log('removeAlert ', set);
        States.update({ _id }, { $unset: set }, false, true, (err, data) => console.log('result data', err, data))
        States.update({ _id }, { $pull:{alerts:null}}, (err, data) => console.log('result data', err, data))
    },
})

