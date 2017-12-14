import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { check } from 'meteor/check';

import States from '../states';

Meteor.publish('states.list', () => {
  console.log('publish states list');
  const self = this.Meteor;
  const user = self.user();
  if (user) {
    const filters = {
      corporationId: (user.profile && user.profile.corporationId) || '',
    };
    return States.find(filters, { sort: { code: 1 } });
  } else return;
});

Meteor.publish('states.view', (_id) => {
  check(_id, String);
  return States.find(_id);
});
