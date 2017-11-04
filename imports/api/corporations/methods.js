import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import _ from 'lodash';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Corporations from './corporations';
import rateLimit from '../../modules/rate-limit.js';

export const upsertCorporation = new ValidatedMethod({
    name: 'corporations.upsert',
    validate: new SimpleSchema({
        _id: { type: String, optional: true },
        name: { type: String, optional: true },
        adminsEmails: { type: [String], optional: true },
    }).validator(),
    run(corporation) {
        console.log('CORP', corporation);
        return Corporations.upsert({ _id: corporation._id }, { $set: corporation });
    },
});

export const removeCorporation = new ValidatedMethod({
    name: 'corporations.remove',
    validate: new SimpleSchema({
        _id: { type: String },
    }).validator(),
    run({ _id }) {
        Corporations.remove(_id);
    },
});

export const selectByUser = new ValidatedMethod({
    name: 'corporations.selectbyuser',
    validate: new SimpleSchema({

    }).validator(),
    run() {
        const filters = { adminsEmails: { $in: _.map(Meteor.user().emails, 'address') } };
        const corporation = Corporations.findOne(filters);
        if (corporation) Meteor.users.update(this.userId, { $set: { 'profile.selectedCorporationId': corporation._id } });
    },
});

rateLimit({
    methods: [
        upsertCorporation,
        removeCorporation,
        selectByUser,
    ],
    limit: 5,
    timeRange: 1000,
});