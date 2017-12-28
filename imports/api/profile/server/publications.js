import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { check } from 'meteor/check';

Meteor.publish('user.profile', () => {
    // check(_id, String);
    return Meteor.users.find({}, { fields: { profile: 1 } });
});