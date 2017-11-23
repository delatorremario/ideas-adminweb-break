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
})

