import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

import { check } from 'meteor/check';

import Ideas from '../ideas';

Meteor.publish('ideas.list', (
  textSearch,
  stateFilter,
  stepFilter,
  areaIdFilter,
  limit) => {
  check(textSearch, String);
  check(stateFilter, String);
  check(stepFilter, String);
  check(areaIdFilter, String);
  check(limit, Number);


  const self = this.Meteor;
  const user = self.user();

  if (user) {
    const filters = {
      corporationId: (user.profile && user.profile.selectedCorporationId) || '',
    };

    if (textSearch) _.extend(filters, { $text: { $search: textSearch } });
    if (stateFilter) _.extend(filters, { 'states.state': { $in: [stateFilter] } });

    console.log('FILTERS', filters);

    return Ideas.find(
      filters,
      { sort: { createdAt: -1 }, limit });

  } else return;
});

Meteor.publish('ideas.view', (_id) => {
  check(_id, String);
  return Ideas.find(_id);
});
