import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import _ from 'lodash';

import { check } from 'meteor/check';


import Corporations from '../corporations';

Meteor.publish('corporations.list', () => {
  const self = this.Meteor;
  const user = self.user();

  let filters = {};

  if (user) {
    if (!Roles.userIsInRole(user._id, ['SuperAdminHolos'])) { // No Está en el Rol SuperAdminHolos
      filters = { adminsEmails: { $in: _.map(user.emails, 'address') } };
    }
    return Corporations.find(filters);
  } else return;
});


Meteor.publish('corporation.view', (_id) => {
  check(_id, String);
  return Corporations.find(_id);
});
