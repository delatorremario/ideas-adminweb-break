import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { check } from 'meteor/check';

Meteor.publish('user.profile', (_id) => {
    check(_id, String);
    return Meteor.users.find({ _id }, { fields: { emails:1, profile: 1 } });
});