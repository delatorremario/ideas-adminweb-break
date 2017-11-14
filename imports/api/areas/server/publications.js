import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import _ from 'lodash';
import { check } from 'meteor/check';

import Areas from '../areas';

Meteor.publish('areas.search', (textSearch) => {
  check(textSearch, String);
  const self = this.Meteor;
  const user = self.user();
  if (user) {
    const filters = {
      corporationId: (user.profile && user.profile.selectedCorporationId) || '',
      $text: { $search: textSearch },
    };
    return Areas.find(filters, { fields: { score: { $meta: 'textScore' } } });
  } else return;
});

Meteor.publish('areas.view', (_id) => {
  check(_id, String);
  return Areas.find(_id);
});
