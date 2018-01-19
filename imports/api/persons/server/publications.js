import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import _ from 'lodash';

import { check } from 'meteor/check';


import Persons from '../persons';

Meteor.publish('persons.search', (text, onlyChief, myArea, limit) => {
  check(text, String);
  check(limit, Number);
  check(myArea, Boolean);
  check(onlyChief, Boolean);

  const self = this.Meteor;
  const user = self.user();

  if (!user) return;
    const filters = { $text: { $search: text }, corporationId: (user.profile && user.profile.corporationId) || '' };
    if (onlyChief) _.extend(filters, { group: 'EXECUT.' })
    if (myArea) {
      _.extend(filters, { areaId: user.profile && user.profile.areaId })
      console.log('myarea', myArea, user);
    }
    const persons = Persons.find(
      filters,
      { fields: { score: { $meta: 'textScore' } } }, { sort: { score: -1 }, limit: limit });

    return persons;
});

Meteor.publish('persons.view', (_id) => {
  check(_id, String);
  return Persons.find(_id);
});
Meteor.publish('persons.executive', (_id) => {
  check(_id, String);
  return Persons.find(_id);
});

Meteor.publish('persons.email', (email) => {
  check(email, String);
  return Persons.find({ email });
});
