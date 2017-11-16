import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

import { check } from 'meteor/check';

import Ideas from '../ideas';

Meteor.publish('ideas.list', (
  textSearch,
  statesCodesFilter,
  areasIdsFilter,
  limit) => {

    console.log('statesCodesFilter', statesCodesFilter);

  check(textSearch, String);
  check(statesCodesFilter, [String]);
  check(areasIdsFilter, [String]);
  check(limit, Number);


  const self = this.Meteor;
  const user = self.user();

  if (user) {
    const filters = {
      corporationId: (user.profile && user.profile.selectedCorporationId) || '',
    };

    if (textSearch) _.extend(filters, { $text: { $search: textSearch } });
    if (statesCodesFilter.length > 0) _.extend(filters, { 'states.code': { $in: statesCodesFilter } });
    if (areasIdsFilter.length > 0) _.extend(filters, { 'chief.areaId': { $in: areasIdsFilter } });

    // console.log('areasIdsFilter', areasIdsFilter);
    console.log('FILTERS', filters);

    return Ideas.find(
      filters,
      { sort: { date: -1 }, limit });

  } else return;
});

Meteor.publish('ideas.view', (_id) => {
  check(_id, String);
  return Ideas.find(_id);
});
