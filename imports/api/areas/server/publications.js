import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import _ from 'lodash';

import { check } from 'meteor/check';


import Areas from '../areas';

Meteor.publish('areas.list', () => {
  const self = this.Meteor;
  const user = self.user();

  let filters = {};

  // if (user) {
  //   if (!Roles.userIsInRole(user._id, ['SuperAdminHolos'])) { // No Está en el Rol SuperAdminHolos
  //     filters = { adminsEmails: { $in: _.map(user.emails, 'address') } };
  //   }
    return Areas.find(filters);
  // } else return;
});


Meteor.publish('areas.view', (_id) => {
  check(_id, String);
  return Areas.find(_id);
});
