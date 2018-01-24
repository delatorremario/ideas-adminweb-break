import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import _ from 'lodash';
import { check } from 'meteor/check';
import Persons from '../persons';
import Areas from '../../areas/areas';
import { findChiefs } from '../../areas/methods';

Meteor.publish('persons.idList', (limit) => {
  check(limit, Number);
  let persons = Persons.find({}, { fields: { _id: 1 }, limit: limit });
  return persons;
})

Meteor.publish('persons.search', (text, onlyChief, myArea, parentArea, limit) => {
  check(text, String);
  check(limit, Number);
  check(myArea, Boolean);
  check(onlyChief, Boolean);
  check(parentArea, Boolean);

  const self = this.Meteor;
  const user = self.user();

  if (!user) return;

  let filters = { $text: { $search: text }, corporationId: (user.profile && user.profile.corporationId) || '' };

  if (onlyChief) _.extend(filters, { group: 'EXECUT.' })
  if (myArea) {
    _.extend(filters, { areaId: user.profile && user.profile.areaId })
  }

  if (onlyChief && parentArea) {
    const area = Areas.findOne({ _id: user.profile && user.profile.areaId })
    const chiefsIds = findChiefs(area);
    filters = { _id: { $in: chiefsIds } }
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
  console.log('publish persons.email')
  check(email, String);
  return Persons.find({ email });
});
