import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

import { check } from 'meteor/check';

import TypesAreaStructure from '../typesareastructure';

Meteor.publish('typesareastructure.list', () => {
  const self = this.Meteor;
  const user = self.user();

  if (user) {
    const filters = { corporationId: (user.profile && user.profile.corporationId) || '' };
    return TypesAreaStructure.find(filters);
  } else return;
});

Meteor.publish('typesareastructure.view', (_id) => {
  check(_id, String);
  return TypesAreaStructure.find(_id);
});
