import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import _ from 'lodash';
import { check } from 'meteor/check';

import Areas from '../areas';

Meteor.publish('areas.search', (textSearch, limit) => {
  // console.log('publish areas.search', textSearch);
  check(textSearch, String);
  check(limit, Match.Maybe(Number));
  const self = this.Meteor;
  const user = self.user();
  if (!user) return this.stop();
  const filters = {
    corporationId: (user.profile && user.profile.corporationId) || '',
    $text: { $search: textSearch },
  };
  return Areas.find(filters, { fields: { score: { $meta: 'textScore' } } }, { sort: { score: -1 }, limit: limit });
});

Meteor.publish('areas.list', () => {
  console.log('publish areas.list');
  const self = this.Meteor;
  const user = self.user();
  if (user) {
    const filters = {
      corporationId: (user.profile && user.profile.corporationId) || '',
    };
    return Areas.find(filters);
  } else return;
});

Meteor.publish('areas.view', (_id) => {
  check(_id, String);
  return Areas.find(_id);
});
