import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import _ from 'lodash';

import { check } from 'meteor/check';


import Persons from '../persons';

Meteor.publish('persons.search', (text, limit) => {
  check(text, String);
  check(limit, Number);
  const self = this.Meteor;
  const user = self.user();

  if (user) {
    const filters = { $text: { $search: text }, corporationId: (user.profile && user.profile.corporationId) || '' };
    const persons = Persons.find(
      filters,
      { fields: { score: { $meta: 'textScore' } } }, { sort: { score: -1 }, limit: limit });

    return persons;
  } else return;
});

Meteor.publish('persons.view', (_id) => {
  check(_id, String);
  return Persons.find(_id);
});

Meteor.publish('persons.email', (email) => {
  check(email, String);
  return Persons.find({ email });
});
