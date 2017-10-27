import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import _ from 'lodash';

import { check } from 'meteor/check';


import TypesAreas from '../typesareas';

Meteor.publish('typesareas.list', () => {
  const self = this.Meteor;
  const user = self.user();

  let filters = {};

  // if (user) {
  //   if (!Roles.userIsInRole(user._id, ['SuperAdminHolos'])) { // No Está en el Rol SuperAdminHolos
  //     filters = { adminsEmails: { $in: _.map(user.emails, 'address') } };
  //   }
    return TypesAreas.find(filters);
  // } else return;
});


Meteor.publish('typesareas.view', (_id) => {
  check(_id, String);
  return TypesAreas.find(_id);
});
