import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import _ from 'lodash';

import { check } from 'meteor/check';


import TypesAreaStructure from '../typesareastructure';

Meteor.publish('typesareastructure.list', (corporationId) => {
  const self = this.Meteor;
  const user = self.user();

  let filters = { corporationId };

  // if (user) {
  //   if (!Roles.userIsInRole(user._id, ['SuperAdminHolos'])) { // No Está en el Rol SuperAdminHolos
  //     filters = { adminsEmails: { $in: _.map(user.emails, 'address') } };
  //   }
  return TypesAreaStructure.find(filters);
  // } else return;
});


Meteor.publish('typesareastructure.view', (_id) => {
  check(_id, String);
  return TypesAreaStructure.find(_id);
});
