import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import _ from 'lodash';

import { check } from 'meteor/check';


import Persons from '../persons';

Meteor.publish('persons.list', () => {
  const self = this.Meteor;
  const user = self.user();
  if (user) {
    const filters = { corporationId: (user.profile && user.profile.selectedCorporationId) || '' };
    return Persons.find(filters);
  } else return;
});

Meteor.publish('persons.view', (_id) => {
  check(_id, String);
  return Persons.find(_id);
});
