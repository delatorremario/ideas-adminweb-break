import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

import { check } from 'meteor/check';


import TypesAreas from '../typesareas';

Meteor.publish('typesareas.list', (corporationId) => {
  const self = this.Meteor;
  const user = self.user();

  let filters = { corporationId };

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
