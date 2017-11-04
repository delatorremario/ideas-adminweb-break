import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import _ from 'lodash';

import { check } from 'meteor/check';

import Ideas from '../ideas';

Meteor.publish('ideas.list', () => {
  const self = this.Meteor;
  const user = self.user();
  if (user) {
    const filters = { corporationId: (user.profile && user.profile.selectedCorporationId) || '' };
    return Ideas.find(filters);
  } else return;
});

Meteor.publish('ideas.view', (_id) => {
  check(_id, String);
  return Ideas.find(_id);
});
