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
    'state.addAlert': (_id) => {
        check(_id, String);

        const alert = {
            temporal: false,
            stateChange: false,
            delay: 1,
            daily: false,
            weekly: false,
            sendEmail: true,
            sendInbox: false,
            employee: false,
            lead: true,
            oneUp: false,
            chief: false,
            message: '',
        }

        States.update({ _id }, { $addToSet: { alerts: alert } })

    },

    'state.removeAlert': (_id, alert) => {
        if (Meteor.isClient) return;
        check(_id, String);
        check(alert, Object);

        // const set = { [`alerts.${index}`]: 1 }
        // console.log('removeAlert ', set);
        // States.update({ _id }, { $unset: set }, false, true, (err, data) => console.log('result data', err, data))
        States.update({ _id }, { $pull: { alerts: alert } }, (err, data) => console.log('result data', err, data))
    },
    'state.updownValue': (_id, name, up) => {
        check(_id, String);
        check(name, String);
        check(up, Boolean);

        const value = up && 1 || -1;
        const update = { $inc: { [name]: value } };

        States.update({ _id }, update);
    },
    'state.updownDelay': (_id, up, index) => {
        check(_id, String);
        check(up, Boolean);
        check(index, Number);

        const value = up && 1 || -1;
        const update = { $inc: { [`alerts.${index}.delay`]: value } };

        States.update({ _id }, update);
    },
    'state.alert.value': (_id, index, name, value) => {
        check(_id, String);
        check(name, String);
        check(value, Boolean);
        check(index, Number);
        
        const update = { $set: { [`alerts.${index}.${name}`]: value } };
        
        States.update({ _id }, update)
    },
})

